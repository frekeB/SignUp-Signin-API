import express from 'express';
import { login, register } from '../controllers/Usercontroller';
export const userRoute = express.Router();
userRoute.post('/create', register);
userRoute.post('/login', login);
