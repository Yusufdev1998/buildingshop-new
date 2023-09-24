"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("./../../controllers/report.controller");
const reportRouter = (0, express_1.Router)();
reportRouter.get("/", report_controller_1.getBuildersReport);
reportRouter.get("/builders/:id", report_controller_1.getBuildersReport);
exports.default = reportRouter;
