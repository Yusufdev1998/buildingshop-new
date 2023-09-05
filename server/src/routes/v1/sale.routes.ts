import { Router } from "express";
import {
  create,
  get,
  update,
  destroy,
} from "../../controllers/sale.controller";

const saleRouter = Router();

saleRouter.get("/", get);
saleRouter.post("/", create);
saleRouter.patch("/:id", update);
saleRouter.delete("/:id", destroy);

export default saleRouter;
