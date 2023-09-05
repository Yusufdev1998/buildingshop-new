import { Router } from "express";
import {
  get,
  create,
  update,
  destroy,
} from "../../controllers/productMeasure.controller";

const productMeasureRouter = Router();

productMeasureRouter.get("/", get);
productMeasureRouter.post("/", create);
productMeasureRouter.patch("/:id", update);
productMeasureRouter.delete("/:id", destroy);

export default productMeasureRouter;
