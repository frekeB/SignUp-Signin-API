import dotenv from 'dotenv';

let SERVER_PORT;
if (process.env.NODE_ENV === 'production'){
 SERVER_PORT = process.env.PORT;
}
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = 'mongodb+srv://Frekeb:Ndy1!$!$@cluster0.i7uakfx.mongodb.net/test';

if (process.env.NODE_ENV !== 'production'){
    SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT): 1337
}

export const config = {
    mongo:{
        url:MONGO_URL
    },
    server:{
        port:SERVER_PORT
    }
}
