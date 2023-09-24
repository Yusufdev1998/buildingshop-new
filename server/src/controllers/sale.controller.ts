import { Request, Response } from "express";
import prisma from "../db/prisma";
import { customRequest } from "../middlewares/AdminAuth";

export const get = async (req: Request, res: Response) => {
  try {
    let { page, limit, search } = req.query;

    const currentPage = page || 1;
    const currentLimit = limit || 10;
    const currentSearch = (search as string) || "";
    const skip = (+currentPage - 1) * +currentLimit;

    const brends = await prisma.sale.findMany({
      skip,
      take: +currentLimit,
      where: {
        OR: [
          {
            builder: {
              first_name: {
                startsWith: currentSearch,
                mode: "insensitive",
              },
            },
          },
          {
            builder: {
              last_name: {
                startsWith: currentSearch,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        builder: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    res.json(brends);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      builder_id,
      branch_id,
      sold_products,
      total_summa,
      total_ball,
      sale_type,
    } = req.body;

    const [sale] = await prisma.$transaction([
      prisma.sale.create({
        data: {
          builder_id,
          branch_id,
          sold_products,
          total_summa,
          total_ball,
          sale_type,
          user_id: (req as customRequest).user_id,
        },
      }),
      prisma.builder.update({
        where: {
          id: builder_id,
        },
        data: {
          ball: {
            increment: total_ball,
          },
        },
      }),
    ]);
    res.status(201).json(sale);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const { builder_id, branch_id, sold_products, total_summa, total_ball } =
      req.body;

    const oldSale = await prisma.sale.findUnique({
      where: {
        id,
      },
      select: {
        total_ball: true,
      },
    });

    if (oldSale) {
      const oldBall = oldSale.total_ball;
      const ballDiff = total_ball - oldBall;
      const [sale] = await prisma.$transaction([
        prisma.sale.update({
          where: {
            id,
          },
          data: {
            builder_id,
            branch_id,
            sold_products,
            total_summa,
            total_ball,
            user_id: (req as customRequest).user_id,
          },
          include: {
            builder: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        }),
        prisma.builder.update({
          where: {
            id: builder_id,
          },
          data: {
            ball: {
              increment: ballDiff,
            },
          },
        }),
      ]);
      res.status(200).json(sale);
    } else {
      throw new Error("Sale not found");
    }
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const oldSale = await prisma.sale.findUnique({
      where: {
        id,
      },
      select: {
        total_ball: true,
        builder_id: true,
      },
    });

    if (oldSale) {
      const { total_ball, builder_id } = oldSale;
      const [sale] = await prisma.$transaction([
        prisma.sale.delete({
          where: {
            id,
          },
        }),
        prisma.builder.update({
          where: {
            id: builder_id,
          },
          data: {
            ball: {
              decrement: total_ball,
            },
          },
        }),
      ]);
      res.status(201).json(sale);
    } else {
      throw new Error("Sale not found");
    }
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};
