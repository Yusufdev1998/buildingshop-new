import { Request, Response } from "express";
import prisma from "../db/prisma";
import { customRequest } from "../middlewares/AdminAuth";

export const get = async (req: Request, res: Response) => {
  try {
    const result = await prisma.products.findMany();
    res.json(result);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      ball,
      brend_name,
      product_type_name,
      product_measure_name,
    } = req.body;
    const products = await prisma.products.create({
      data: {
        name,
        user_id: (req as customRequest).user_id,
        price,
        ball,
        brend_name,
        product_measure_name,
        product_type_name,
      },
    });
    res.status(201).json(products);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};

export const update = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const updated = await prisma.products.update({
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
    const products = await prisma.products.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};
