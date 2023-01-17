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
exports.generateToken = exports.verifyPassword = exports.hashUserPassword = exports.genPassword = void 0;
// Hash password
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = __importDefault(require("../model/User"));
const genPassword = (password, key) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedpassword = yield bcrypt_1.default.hash(password, key);
    return hashedpassword;
});
exports.genPassword = genPassword;
//during register
const hashUserPassword = (pasword) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(pasword, salt);
    return {
        salt,
        hash
    };
});
exports.hashUserPassword = hashUserPassword;
//during login
const verifyPassword = (Inpassword, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    const { password, key } = user;
    const hashedpassword = yield (0, exports.genPassword)(Inpassword, key);
    const check = yield bcrypt_1.default.compare(password, hashedpassword);
    return check;
});
exports.verifyPassword = verifyPassword;
const generateToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
        expiresIn: '3d'
    });
});
exports.generateToken = generateToken;
