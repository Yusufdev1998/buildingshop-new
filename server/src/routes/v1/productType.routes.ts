import { Router } from "express";
import {
  get,
  create,
  update,
  destroy,
} from "../../controllers/productType.controller";

const productTypeRouter = Router();

productTypeRouter.get("/", get);
productTypeRouter.post("/", create);
productTypeRouter.patch("/:id", update);
productTypeRouter.delete("/:id", destroy);

export default productTypeRouter;
