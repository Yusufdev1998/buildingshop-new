"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_1 = require("../../controllers/sale.controller");
const saleRouter = (0, express_1.Router)();
saleRouter.get("/", sale_controller_1.get);
saleRouter.post("/", sale_controller_1.create);
exports.default = saleRouter;
