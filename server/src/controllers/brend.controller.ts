import { Request, Response } from "express";
import prisma from "../db/prisma";
import { customRequest } from "../middlewares/AdminAuth";

export const get = async (req: Request, res: Response) => {
  try {
    const brends = await prisma.brand.findMany();
    res.json(brends);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const brand = await prisma.brand.create({
      data: {
        name,
        user_id: (req as customRequest).user_id,
      },
    });
    res.status(201).json(brand);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};

export const update = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const updated = await prisma.brand.update({
      where: {
        id: +id,
      },
      data,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const brand = await prisma.brand.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(brand);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};
