"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const brend_routes_1 = __importDefault(require("./brend.routes"));
const productType_routes_1 = __importDefault(require("./productType.routes"));
const productMeasure_routes_1 = __importDefault(require("./productMeasure.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const v1Routes = (0, express_1.Router)();
// user
v1Routes.use("/user", user_routes_1.default);
// Services
v1Routes.use("/brands", auth_1.default, brend_routes_1.default);
v1Routes.use("/product-types", auth_1.default, productType_routes_1.default);
v1Routes.use("/product-measures", auth_1.default, productMeasure_routes_1.default);
v1Routes.use("/products", auth_1.default, product_routes_1.default);
exports.default = v1Routes;
