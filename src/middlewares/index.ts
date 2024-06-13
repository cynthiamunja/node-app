import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken'
import path from 'path';
import dotenv from 'dotenv';
import { Payload } from '../models/authModel';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface extendedRequest1 extends Request{
    info?:Payload
}

export function verifyToken(req:extendedRequest1, res:Response, next:NextFunction){
    try{
        const token=req.headers['token'] as string
        if (!token){
            return res.status(401).json({message:'forbiden'})
        }
        const decodedData=jwt.verify(token,process.env.SECRET as string) as Payload
        req.info=decodedData

    } catch(error){
        return res.status(500).json(error)
    }
    next()
}