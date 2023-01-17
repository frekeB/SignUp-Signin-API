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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../model/User"));
const utils_1 = require("../utils");
const auth_1 = require("../utils/auth");
//@desc
//Register new user
//access public
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, gender, password } = req.body;
        const { salt, hash } = yield (0, utils_1.hashUserPassword)(password);
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        const newUser = yield User_1.default.create({
            userName,
            password: hash,
            gender,
            email,
            key: salt
        });
        res.status(201).json({
            code: 201,
            data: newUser
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            code: 400,
            error: error.message
        });
        console.log(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userExists = yield User_1.default.findOne({ email });
        if (!userExists)
            throw new Error('Account does not exist plaease Register');
        const check = yield (0, utils_1.verifyPassword)(password, email);
        console.log(check);
        if (!check)
            throw new Error('Email or password in incorect');
        const token = yield (0, auth_1.generateToken)({ id: userExists.id, email, loggedIn: true });
        res.status(200).json({
            code: 200,
            token,
            message: 'logged in Success'
        });
    }
    catch (error) {
        res.status(400).json({ code: 400, error: error.message });
    }
});
exports.login = login;
