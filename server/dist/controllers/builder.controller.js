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
exports.destroy = exports.update = exports.login = exports.signup = exports.create = exports.get = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brends = yield prisma_1.default.builder.findMany();
        res.json(brends);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.get = get;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, phone_number, extra_phone, region, address, date_of_birth, password, img_url, } = req.body;
        const builder = yield prisma_1.default.builder.create({
            data: {
                first_name,
                last_name,
                phone_number,
                password,
                extra_phone,
                region,
                address,
                date_of_birth,
                img_url,
            },
        });
        res.status(201).json(builder);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.create = create;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, phone_number, extra_phone, region, address, date_of_birth, password, img_url, } = req.body;
        const builder = yield prisma_1.default.builder.create({
            data: {
                first_name,
                last_name,
                phone_number,
                password,
                extra_phone,
                region,
                address,
                date_of_birth,
                img_url,
            },
        });
        res.status(201).json(builder);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone_number, password } = req.body;
        const builder = yield prisma_1.default.builder.findFirst({
            where: {
                phone_number,
                password,
            },
        });
        if (builder) {
            const token = jsonwebtoken_1.default.sign({ user_id: builder.id }, process.env.TOKEN_SECRET, {
                expiresIn: "30d",
            });
            res.json({
                first_name: builder.first_name,
                last_name: builder.last_name,
                token,
            });
        }
        else {
            res.status(400).send({ error: "Login or Password wrong!" });
        }
        res.status(200).json();
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.login = login;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    try {
        const updated = yield prisma_1.default.builder.update({
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
        const builder = yield prisma_1.default.builder.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(builder);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.destroy = destroy;
