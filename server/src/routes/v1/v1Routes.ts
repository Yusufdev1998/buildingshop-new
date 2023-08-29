import { Router } from "express";
import userRouter from "./user.routes";
import auth from "../../middlewares/auth";
import brendRouter from "./brend.routes";

const v1Routes = Router();

v1Routes.use("/user", userRouter);
v1Routes.use("/brands", auth, brendRouter);

export default v1Routes;
