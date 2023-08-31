import { Router } from "express";
import { create, get } from "../../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", get);
productRouter.post("/", create);

export default productRouter;
