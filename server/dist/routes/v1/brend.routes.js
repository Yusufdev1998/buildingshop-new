"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brend_controller_1 = require("../../controllers/brend.controller");
const brendRouter = (0, express_1.Router)();
brendRouter.get("/", brend_controller_1.get);
brendRouter.post("/", brend_controller_1.create);
exports.default = brendRouter;
