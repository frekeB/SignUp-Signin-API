import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const router = express()

/** connect to Mongoose */

mongoose.connect(config.mongo.url,{retryWrites: true, w: 'majority'})
.then(() =>{console.log('connected')
});
.catch((error)=>{console.log(error);
});