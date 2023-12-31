"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../../controllers/product.controller");
const productRouter = (0, express_1.Router)();
productRouter.get("/", product_controller_1.get);
productRouter.post("/", product_controller_1.create);
productRouter.patch("/:id", product_controller_1.update);
productRouter.delete("/:id", product_controller_1.destroy);
exports.default = productRouter;
