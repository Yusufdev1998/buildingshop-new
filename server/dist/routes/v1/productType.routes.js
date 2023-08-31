"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productType_controller_1 = require("../../controllers/productType.controller");
const productTypeRouter = (0, express_1.Router)();
productTypeRouter.get("/", productType_controller_1.get);
productTypeRouter.post("/", productType_controller_1.create);
exports.default = productTypeRouter;
