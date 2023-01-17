import express from 'express';
import http from 'http';
import mongoose, { trusted } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
const port = process.env.PORT;
dotenv.config();

// =========Route========//
import { userRoute } from './routes/userRoute';
// =======end of Route========//

// global middleware//
const app = express();
app.use(cors());
app.use(express.json());
// global middleware//

// =========useRoutes========//
app.use('/user', userRoute);
// ======= useRoutes========//

const conn = mongoose.connect(process.env.MONGO_URL as string, {}, () => {
    mongoose.set('strictQuery', false);
    console.log('db up and running ');
});

app.listen(port, () => {
    console.log('server listening ' + port);
});
