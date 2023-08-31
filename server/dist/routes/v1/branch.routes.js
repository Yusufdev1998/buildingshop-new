"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branch_controller_1 = require("../../controllers/branch.controller");
const branchRouter = (0, express_1.Router)();
branchRouter.get("/", branch_controller_1.get);
branchRouter.post("/", branch_controller_1.create);
exports.default = branchRouter;
