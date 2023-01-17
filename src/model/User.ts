import express from 'express';
import mongoose from 'mongoose';
import { UserInterface } from '../interface/UserInterface';

const userSchema = new mongoose.Schema<UserInterface>(
    {
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
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);
