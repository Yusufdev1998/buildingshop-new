import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getBuildersReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let result;
    if (id) {
      const [sales, withdraws] = await prisma.$transaction([
        prisma.sale.findMany({
          where: {
            builder_id: +id,
          },
          select: {
            updatedAt: true,
            total_ball: true,
            sale_type: true,
          },
        }),
        prisma.withdrawBuilder.findMany({
          where: {
            builder_id: +id,
          },
        }),
      ]);
      res.json({
        sales,
        withdraws,
      });
    } else {
      result = await prisma.builder.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          phone_number: true,
          ball: true,
        },
        orderBy: {
          ball: "desc",
        },
      });
    }

    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
