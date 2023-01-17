"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        require: [true, 'Please add a name']
    },
    key: {
        type: String,
        required: [true, 'passwork key is require']
    },
    email: {
        type: String,
        require: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please add a password']
    },
    gender: {
        type: String,
        require: [true, 'Please add your gender']
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('User', userSchema);
