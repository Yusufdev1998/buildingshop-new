import { Router } from "express";
import { create, get } from "../../controllers/brend.controller";

const brendRouter = Router();

brendRouter.get("/", get);
brendRouter.post("/", create);

export default brendRouter;
