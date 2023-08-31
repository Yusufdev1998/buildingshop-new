import { Router } from "express";
import { create, get } from "../../controllers/productMeasure.controller";

const productMeasure = Router();

productMeasure.get("/", get);
productMeasure.post("/", create);

export default productMeasure;
