"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productMeasure_controller_1 = require("../../controllers/productMeasure.controller");
const productMeasure = (0, express_1.Router)();
productMeasure.get("/", productMeasure_controller_1.get);
productMeasure.post("/", productMeasure_controller_1.create);
exports.default = productMeasure;
