"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const withdraw_controller_1 = require("../../controllers/withdraw.controller");
const withdrawRouter = (0, express_1.Router)();
withdrawRouter.get("/", withdraw_controller_1.get);
withdrawRouter.post("/", withdraw_controller_1.create);
exports.default = withdrawRouter;
