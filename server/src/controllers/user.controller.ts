import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import prisma from "../db/prisma";

export const get = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany();
    res.json(result);
  } catch (error: any) {
    console.log(error);

    res.status(400).send({ error: error.message });
  }
};

enum UserType {
  ADMIN = "ADMIN",
  RETAILER = "RETAILER",
}
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, login, password, branch } = req.body;
    let user_type;
    if (branch) {
      user_type = UserType.RETAILER;
    } else {
      user_type = UserType.ADMIN;
    }

    const result = await prisma.user.create({
      data: {
        name,
        login,
        password,
        user_type,
        branch,
      },
    });
    res.status(201).send(result);
  } catch (error: any) {
    console.log(error);

    res.status(400).send({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        login,
        password,
      },
    });
    if (user) {
      const token = jwt.sign(
        { user_id: user.id, user_type: user.user_type, branch: user.branch },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.json({
        name: user.name,
        user_type: user.user_type,
        token,
      });
    } else {
      res.status(400).send({ error: "Login or Password wrong!" });
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const updated = await prisma.user.update({
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
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).send({ error: error });
  }
};
