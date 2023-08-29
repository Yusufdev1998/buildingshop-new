import { createUser, login } from "./../../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", login);

export default userRouter;
