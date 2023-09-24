"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.user_type !== "RETAILER") {
            throw new Error("Hacker captured!!!");
        }
        req.user_id = decoded.user_id;
        req.branch = decoded.branch;
        next();
    }
    catch (error) {
        res.status(403).send({ error: error.message });
    }
};
