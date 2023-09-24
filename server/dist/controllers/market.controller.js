"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vozvrat = exports.sale = exports.get = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.products.findMany();
        res.json(result);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.get = get;
const sale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { builder_id, sold_products, total_summa, total_ball, sale_type, } = req.body;
        const [sale] = yield prisma_1.default.$transaction([
            prisma_1.default.sale.create({
                data: {
                    builder_id,
                    branch: req.branch,
                    sold_products,
                    total_summa,
                    total_ball,
                    sale_type,
                    user_id: req.user_id,
                },
            }),
            prisma_1.default.builder.update({
                where: {
                    id: builder_id,
                },
                data: {
                    ball: {
                        increment: total_ball,
                    },
                },
            }),
        ]);
        res.status(201).json(sale);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.sale = sale;
const vozvrat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { builder_id, sold_products, total_summa, total_ball, sale_type } = req.body;
        const [sale] = yield prisma_1.default.$transaction([
            prisma_1.default.sale.create({
                data: {
                    builder_id,
                    branch: req.branch,
                    sold_products,
                    total_summa,
                    total_ball,
                    sale_type,
                    user_id: req.user_id,
                },
            }),
            prisma_1.default.builder.update({
                where: {
                    id: builder_id,
                },
                data: {
                    ball: {
                        decrement: total_ball,
                    },
                },
            }),
        ]);
        res.status(201).json(sale);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.vozvrat = vozvrat;
