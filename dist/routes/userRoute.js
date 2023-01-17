"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const Usercontroller_1 = require("../controllers/Usercontroller");
exports.userRoute = express_1.default.Router();
exports.userRoute.post('/create', Usercontroller_1.register);
exports.userRoute.post('/login', Usercontroller_1.login);
