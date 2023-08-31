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
exports.create = exports.get = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.withdrawBuilder.findMany();
        res.json(result);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.get = get;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { builder_id, ball } = req.body;
        const [withdraw] = yield prisma_1.default.$transaction([
            prisma_1.default.withdrawBuilder.create({
                data: {
                    builder_id,
                    ball,
                    user_id: req.user_id,
                },
            }),
            prisma_1.default.builder.update({
                where: {
                    id: builder_id,
                },
                data: {
                    ball: {
                        decrement: ball,
                    },
                },
            }),
        ]);
        res.status(201).json(withdraw);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.create = create;
