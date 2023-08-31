"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const node_cron_1 = __importDefault(require("node-cron"));
const v1Routes_1 = __importDefault(require("./routes/v1/v1Routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// cron jobs
node_cron_1.default.schedule("11 11 31 8 *", () => {
    console.log("every 10 seconds");
});
// API routes
app.use("/api/v1", v1Routes_1.default);
exports.default = app;
