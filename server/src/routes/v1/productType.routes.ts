import { Router } from "express";
import { create, get } from "../../controllers/productType.controller";

const productTypeRouter = Router();

productTypeRouter.get("/", get);
productTypeRouter.post("/", create);

export default productTypeRouter;
