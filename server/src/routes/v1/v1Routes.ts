import { Router } from "express";
import userRouter from "./user.routes";
import adminAuth from "../../middlewares/AdminAuth";
import brendRouter from "./brend.routes";
import productTypeRouter from "./productType.routes";
import productMeasure from "./productMeasure.routes";
import productRouter from "./product.routes";
import builderRouter from "./builder.routes";
import saleRouter from "./sale.routes";
import withdrawRouter from "./withdraw.routes";
import branchRouter from "./branch.routes";
import reportRouter from "./report.routes";
import MarketAuth from "../../middlewares/MarketAuth";
import marketRouter from "./market.routes";

const v1Routes = Router();

// ping
v1Routes.get("/", (req, res) => {
  res.send("Hello");
});

// user
v1Routes.use("/user", userRouter);
// Services
v1Routes.use("/brands", adminAuth, brendRouter);
v1Routes.use("/branches", adminAuth, branchRouter);
v1Routes.use("/product-types", adminAuth, productTypeRouter);
v1Routes.use("/product-measures", adminAuth, productMeasure);
v1Routes.use("/products", adminAuth, productRouter);
v1Routes.use("/builders", adminAuth, builderRouter);

// Sale
v1Routes.use("/sales", adminAuth, saleRouter);
v1Routes.use("/withdraws", adminAuth, withdrawRouter);

// Reports
v1Routes.use("/reports", adminAuth, reportRouter);
// Market
v1Routes.use("/market", MarketAuth, marketRouter);
v1Routes.use("/market/builders", MarketAuth, builderRouter);

export default v1Routes;
