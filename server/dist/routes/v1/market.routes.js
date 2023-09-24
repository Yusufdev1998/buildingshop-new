"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const market_controller_1 = require("../../controllers/market.controller");
const marketRouter = (0, express_1.Router)();
marketRouter.get("/", market_controller_1.get);
marketRouter.post("/sale", market_controller_1.sale);
marketRouter.post("/vozvrat", market_controller_1.vozvrat);
exports.default = marketRouter;
