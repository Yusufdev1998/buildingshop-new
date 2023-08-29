"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@prisma/client/edge");
const prisma = new edge_1.PrismaClient({
    errorFormat: "pretty",
    log: ["query", "info", "warn", "error"],
});
exports.default = prisma;
