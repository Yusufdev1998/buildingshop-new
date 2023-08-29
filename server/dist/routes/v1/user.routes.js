"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./../../controllers/user.controller");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", user_controller_1.createUser);
userRouter.post("/login", user_controller_1.login);
exports.default = userRouter;
