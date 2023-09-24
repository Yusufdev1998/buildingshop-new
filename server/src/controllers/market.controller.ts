import { Request, Response } from "express";
import prisma from "../db/prisma";
import { customRequest } from "../middlewares/MarketAuth";

export const get = async (req: Request, res: Response) => {
  try {
    const result = await prisma.products.findMany();
    res.json(result);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const sale = async (req: Request, res: Response) => {
  try {
    const {
      builder_id,

      sold_products,
      total_summa,
      total_ball,
      sale_type,
    } = req.body;

    const [sale] = await prisma.$transaction([
      prisma.sale.create({
        data: {
          builder_id,
          branch: (req as customRequest).branch,
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

export const vozvrat = async (req: Request, res: Response) => {
  try {
    const { builder_id, sold_products, total_summa, total_ball, sale_type } =
      req.body;

    const [sale] = await prisma.$transaction([
      prisma.sale.create({
        data: {
          builder_id,
          branch: (req as customRequest).branch,
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
            decrement: total_ball,
          },
        },
      }),
    ]);
    res.status(201).json(sale);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};
