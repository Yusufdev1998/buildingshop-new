import { Router } from "express";
import userRouter from "./user.routes";
import auth from "../../middlewares/auth";
import brendRouter from "./brend.routes";
import productTypeRouter from "./productType.routes";
import productMeasure from "./productMeasure.routes";
import productRouter from "./product.routes";
import builderRouter from "./builder.routes";
import saleRouter from "./sale.routes";
import withdrawRouter from "./withdraw.routes";
import branchRouter from "./branch.routes";

const v1Routes = Router();

// user
v1Routes.use("/user", userRouter);
// Services
v1Routes.use("/brands", auth, brendRouter);
v1Routes.use("/branches", auth, branchRouter);
v1Routes.use("/product-types", auth, productTypeRouter);
v1Routes.use("/product-measures", auth, productMeasure);
v1Routes.use("/products", auth, productRouter);
v1Routes.use("/builders", auth, builderRouter);

// Sale
v1Routes.use("/sales", auth, saleRouter);
v1Routes.use("/withdraws", auth, withdrawRouter);

// Reports
v1Routes.use("/reports", auth);

export default v1Routes;
