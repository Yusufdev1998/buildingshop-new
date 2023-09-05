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
exports.getBuildersReport = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const getBuildersReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let result;
        if (id) {
            const [sales, withdraws] = yield prisma_1.default.$transaction([
                prisma_1.default.sale.findMany({
                    where: {
                        builder_id: +id,
                    },
                    select: {
                        updatedAt: true,
                        total_ball: true,
                        sale_type: true,
                    },
                }),
                prisma_1.default.withdrawBuilder.findMany({
                    where: {
                        builder_id: +id,
                    },
                }),
            ]);
            res.json({
                sales,
                withdraws,
            });
        }
        else {
            result = yield prisma_1.default.builder.findMany({
                select: {
                    first_name: true,
                    last_name: true,
                    phone_number: true,
                    ball: true,
                },
            });
        }
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error });
    }
});
exports.getBuildersReport = getBuildersReport;
