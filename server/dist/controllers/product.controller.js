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
exports.destroy = exports.update = exports.create = exports.get = void 0;
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
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, ball, brend_name, product_type_name, product_measure_name, } = req.body;
        const products = yield prisma_1.default.products.create({
            data: {
                name,
                user_id: req.user_id,
                price,
                ball,
                brend_name,
                product_measure_name,
                product_type_name,
            },
        });
        res.status(201).json(products);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    try {
        const updated = yield prisma_1.default.products.update({
            where: {
                id: +id,
            },
            data,
        });
        res.json(updated);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const products = yield prisma_1.default.products.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.destroy = destroy;
