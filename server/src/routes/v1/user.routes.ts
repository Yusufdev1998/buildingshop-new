import {
  createUser,
  destroy,
  login,
  update,
} from "./../../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.patch("/:id", update);
userRouter.delete("/:id", destroy);

export default userRouter;
