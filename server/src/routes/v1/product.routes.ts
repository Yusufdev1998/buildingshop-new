import { Router } from "express";
import {
  get,
  create,
  update,
  destroy,
} from "../../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", get);
productRouter.post("/", create);
productRouter.patch("/:id", update);
productRouter.delete("/:id", destroy);

export default productRouter;
