import { Request, Response } from "express";
import prisma from "../db/prisma";
import { customRequest } from "../middlewares/AdminAuth";

export const get = async (req: Request, res: Response) => {
  try {
    const result = await prisma.withdrawBuilder.findMany();
    res.json(result);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
export const create = async (req: Request, res: Response) => {
  try {
    const { builder_id, ball } = req.body;

    const [withdraw] = await prisma.$transaction([
      prisma.withdrawBuilder.create({
        data: {
          builder_id,
          ball,
          user_id: (req as customRequest).user_id,
        },
      }),
      prisma.builder.update({
        where: {
          id: builder_id,
        },
        data: {
          ball: {
            decrement: ball,
          },
        },
      }),
    ]);

    res.status(201).json(withdraw);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};
