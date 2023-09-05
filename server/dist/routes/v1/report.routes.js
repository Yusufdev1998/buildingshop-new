"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("./../../controllers/report.controller");
const saleRouter = (0, express_1.Router)();
saleRouter.get("/builders", report_controller_1.getBuildersReport);
saleRouter.get("/builders/:id", report_controller_1.getBuildersReport);
exports.default = saleRouter;
