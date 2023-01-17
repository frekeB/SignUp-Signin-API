import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../interface/UserInterface';
import User from '../model/User';
import { hashUserPassword, verifyPassword } from '../utils';
import { generateToken } from '../utils/auth';
//@desc
//Register new user
//access public
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, gender, password } = req.body;
        const { salt, hash } = await hashUserPassword(password);
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        const newUser: UserInterface = await User.create({
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
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            code: 400,
            error: error.message
        });
        console.log(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (!userExists) throw new Error('Account does not exist plaease Register');
        const check = await verifyPassword(password, email);
        console.log(check);
        if (!check) throw new Error('Email or password in incorect');
        const token = await generateToken({ id: userExists.id, email, loggedIn: true });
        res.status(200).json({
            code: 200,
            token,
            message: 'logged in Success'
        });
    } catch (error: any) {
        res.status(400).json({ code: 400, error: error.message });
    }
};
