import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma";

export const get = async (req: Request, res: Response) => {
  try {
    const brends = await prisma.builder.findMany();
    res.json(brends);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      extra_phone,
      region,
      address,
      date_of_birth,
      password,
      img_url,
    } = req.body;
    const builder = await prisma.builder.create({
      data: {
        first_name,
        last_name,
        phone_number,
        password,
        extra_phone,
        region,
        address,
        date_of_birth,
        img_url,
      },
    });
    res.status(201).json(builder);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      extra_phone,
      region,
      address,
      date_of_birth,
      password,
      img_url,
    } = req.body;
    const builder = await prisma.builder.create({
      data: {
        first_name,
        last_name,
        phone_number,
        password,
        extra_phone,
        region,
        address,
        date_of_birth,
        img_url,
      },
    });
    res.status(201).json(builder);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phone_number, password } = req.body;

    const builder = await prisma.builder.findFirst({
      where: {
        phone_number,
        password,
      },
    });

    if (builder) {
      const token = jwt.sign(
        { user_id: builder.id },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "30d",
        }
      );
      res.json({
        first_name: builder.first_name,
        last_name: builder.last_name,
        token,
      });
    } else {
      res.status(400).send({ error: "Login or Password wrong!" });
    }
    res.status(200).json();
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};

export const update = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const updated = await prisma.builder.update({
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
    const builder = await prisma.builder.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(builder);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};
