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
        let { page, limit, search } = req.query;
        const currentPage = page || 1;
        const currentLimit = limit || 10;
        const currentSearch = search || "";
        const skip = (+currentPage - 1) * +currentLimit;
        const brends = yield prisma_1.default.sale.findMany({
            skip,
            take: +currentLimit,
            where: {
                OR: [
                    {
                        builder: {
                            first_name: {
                                startsWith: currentSearch,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        builder: {
                            last_name: {
                                startsWith: currentSearch,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                builder: {
                    select: {
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        res.json(brends);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.get = get;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { builder_id, branch_id, sold_products, total_summa, total_ball, sale_type, } = req.body;
        const [sale] = yield prisma_1.default.$transaction([
            prisma_1.default.sale.create({
                data: {
                    builder_id,
                    branch_id,
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
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const { builder_id, branch_id, sold_products, total_summa, total_ball } = req.body;
        const oldSale = yield prisma_1.default.sale.findUnique({
            where: {
                id,
            },
            select: {
                total_ball: true,
            },
        });
        if (oldSale) {
            const oldBall = oldSale.total_ball;
            const ballDiff = total_ball - oldBall;
            const [sale] = yield prisma_1.default.$transaction([
                prisma_1.default.sale.update({
                    where: {
                        id,
                    },
                    data: {
                        builder_id,
                        branch_id,
                        sold_products,
                        total_summa,
                        total_ball,
                        user_id: req.user_id,
                    },
                    include: {
                        builder: {
                            select: {
                                first_name: true,
                                last_name: true,
                            },
                        },
                    },
                }),
                prisma_1.default.builder.update({
                    where: {
                        id: builder_id,
                    },
                    data: {
                        ball: {
                            increment: ballDiff,
                        },
                    },
                }),
            ]);
            res.status(200).json(sale);
        }
        else {
            throw new Error("Sale not found");
        }
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const oldSale = yield prisma_1.default.sale.findUnique({
            where: {
                id,
            },
            select: {
                total_ball: true,
                builder_id: true,
            },
        });
        if (oldSale) {
            const { total_ball, builder_id } = oldSale;
            const [sale] = yield prisma_1.default.$transaction([
                prisma_1.default.sale.delete({
                    where: {
                        id,
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
        else {
            throw new Error("Sale not found");
        }
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.destroy = destroy;
