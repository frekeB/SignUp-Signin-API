// Hash password
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { UserInterface } from '../interface/UserInterface';
import User from '../model/User';
import { payload } from '../interface';

export const genPassword = async (password: string, key: string) => {
    const hashedpassword = await bcrypt.hash(password, key);
    return hashedpassword;
};

//during register
export const hashUserPassword = async (pasword: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pasword, salt);
    return {
        salt,
        hash
    };
};

//during login
export const verifyPassword = async (Inpassword: string, email: string) => {
    const user = await User.findOne({ email });
    const { password, key } = user as UserInterface;
    const hashedpassword = await genPassword(Inpassword, key);
    const check = await bcrypt.compare(password, hashedpassword);
    return check;
};

export const generateToken = async (data: payload) => {
    return jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: '3d'
    });
};
