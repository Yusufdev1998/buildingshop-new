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
exports.destroy = exports.update = exports.login = exports.createUser = exports.get = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.user.findMany();
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});
exports.get = get;
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "ADMIN";
    UserType["RETAILER"] = "RETAILER";
})(UserType || (UserType = {}));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, login, password, branch } = req.body;
        let user_type;
        if (branch) {
            user_type = UserType.RETAILER;
        }
        else {
            user_type = UserType.ADMIN;
        }
        const result = yield prisma_1.default.user.create({
            data: {
                name,
                login,
                password,
                user_type,
                branch,
            },
        });
        res.status(201).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                login,
                password,
            },
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ user_id: user.id, user_type: user.user_type, branch: user.branch }, process.env.TOKEN_SECRET, {
                expiresIn: "1d",
            });
            res.json({
                name: user.name,
                user_type: user.user_type,
                token,
            });
        }
        else {
            res.status(400).send({ error: "Login or Password wrong!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});
exports.login = login;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    try {
        const updated = yield prisma_1.default.user.update({
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
        const user = yield prisma_1.default.user.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.destroy = destroy;
