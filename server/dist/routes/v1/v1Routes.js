"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const AdminAuth_1 = __importDefault(require("../../middlewares/AdminAuth"));
const brend_routes_1 = __importDefault(require("./brend.routes"));
const productType_routes_1 = __importDefault(require("./productType.routes"));
const productMeasure_routes_1 = __importDefault(require("./productMeasure.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const builder_routes_1 = __importDefault(require("./builder.routes"));
const sale_routes_1 = __importDefault(require("./sale.routes"));
const withdraw_routes_1 = __importDefault(require("./withdraw.routes"));
const branch_routes_1 = __importDefault(require("./branch.routes"));
const report_routes_1 = __importDefault(require("./report.routes"));
const MarketAuth_1 = __importDefault(require("../../middlewares/MarketAuth"));
const market_routes_1 = __importDefault(require("./market.routes"));
const v1Routes = (0, express_1.Router)();
// ping
v1Routes.get("/", (req, res) => {
    res.send("Hello");
});
// user
v1Routes.use("/user", user_routes_1.default);
// Services
v1Routes.use("/brands", AdminAuth_1.default, brend_routes_1.default);
v1Routes.use("/branches", AdminAuth_1.default, branch_routes_1.default);
v1Routes.use("/product-types", AdminAuth_1.default, productType_routes_1.default);
v1Routes.use("/product-measures", AdminAuth_1.default, productMeasure_routes_1.default);
v1Routes.use("/products", AdminAuth_1.default, product_routes_1.default);
v1Routes.use("/builders", AdminAuth_1.default, builder_routes_1.default);
// Sale
v1Routes.use("/sales", AdminAuth_1.default, sale_routes_1.default);
v1Routes.use("/withdraws", AdminAuth_1.default, withdraw_routes_1.default);
// Reports
v1Routes.use("/reports", AdminAuth_1.default, report_routes_1.default);
// Market
v1Routes.use("/market", MarketAuth_1.default, market_routes_1.default);
v1Routes.use("/market/builders", MarketAuth_1.default, builder_routes_1.default);
exports.default = v1Routes;
