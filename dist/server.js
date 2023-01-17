"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// =========Route========//
const userRoute_1 = require("./routes/userRoute");
// =======end of Route========//
// global middleware//
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// global middleware//
// =========useRoutes========//
app.use('/user', userRoute_1.userRoute);
// ======= useRoutes========//
const conn = mongoose_1.default.connect(process.env.MONGO_URL, {}, () => {
    mongoose_1.default.set('strictQuery', false);
    console.log('db up and running ');
});
app.listen(process.env.SERVER_PORT, () => {
    console.log('server listening ' + process.env.SERVER_PORT);
});
