import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface customRequest extends Request {
  user_id: number;
  branch: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    );
    if ((decoded as { user_type: string }).user_type !== "RETAILER") {
      throw new Error("Hacker captured!!!");
    }

    (req as customRequest).user_id = (decoded as { user_id: number }).user_id;
    (req as customRequest).branch = (decoded as { branch: string }).branch;
    next();
  } catch (error: any) {
    res.status(403).send({ error: error.message });
  }
};
