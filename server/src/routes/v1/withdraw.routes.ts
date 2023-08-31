import { Router } from "express";
import { create, get } from "../../controllers/withdraw.controller";

const withdrawRouter = Router();

withdrawRouter.get("/", get);
withdrawRouter.post("/", create);

export default withdrawRouter;
