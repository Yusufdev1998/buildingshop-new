import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import prisma from "../db/prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, login, password } = req.body;
    await prisma.user.create({
      data: {
        name,
        login,
        password,
        user_type: "ADMIN",
      },
    });
    res.send({ message: "User created" });
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
        { user_id: user.id, user_type: user.user_type },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "30d",
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
