import { Request, Response } from "express";
import prisma from "../db/prisma";
import { customRequest } from "../middlewares/auth";

export const getBrends = async (req: Request, res: Response) => {
  try {
    const brends = await prisma.brand.findMany();
    res.json(brends);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const createBrand = async (req: Request, res: Response) => {
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
