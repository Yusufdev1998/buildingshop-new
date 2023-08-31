import { Router } from "express";
import { create, get } from "../../controllers/sale.controller";

const saleRouter = Router();

saleRouter.get("/", get);
saleRouter.post("/", create);

export default saleRouter;
