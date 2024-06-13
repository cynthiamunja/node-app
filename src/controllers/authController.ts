import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import mssql from 'mssql';
import { sqlConfig } from '../config';
import { log } from 'console';
import { RegisterSchema } from '../Helpers';
import Bcrypt from 'bcrypt'
import { User,Payload } from '../models/authModel';
import jwt from 'jsonwebtoken'
import path from 'path';
import dotenv from 'dotenv';
import { DbHelper } from '../DataBaseHelper'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const dbInstance = new DbHelper()
export const registerUser = async(req:Request, res:Response)=>{
   try{
    const id=uid()
    const{UserName, Email, UserPassword}=req.body

    const pool= await mssql.connect(sqlConfig)

    const{error}=RegisterSchema.validate(req.body)
    if (error){
      res.status(400).json(error)
      console.log(error);
      
     }
    const HashPassword= await Bcrypt.hash(UserPassword, 10)

    await dbInstance.exec('AddUsers', {UserID:id, UserName,Email, UserPassword:HashPassword})
    //make a request
//     await pool.request()
//    // UserID
//    .input("UserID",id)
//     .input("UserName",UserName)
//     .input("Email",Email)
//     .input("UserPassword",HashPassword)
//     .execute('AddUsers')

    res.status(201).json({message:"user Created"})
    }
    catch (error){
        return res.status(500).json(error)
}
}

export const login=async(req:Request, res:Response)=>{
    try{
        const {Email, UserPassword}=req.body
        let pool= await mssql.connect(sqlConfig)

       let user= (await pool.request()

        .input("Email",Email)
    
        .execute('getOneUser')).recordset as User[]
       
        
        if (user.length !==0){
            const isValid=await Bcrypt.compare(UserPassword, user[0].UserPassword)

        if (isValid){
            const payload:Payload={
                UserID:user[0].UserID,
                UserName:user[0].UserName
            }
              const token= jwt.sign(payload, process.env.SECRET as string,{expiresIn:'2h'})
            return res.status(200).json({message:"Login Successful!", token})
        }

        }
        

        return res.status(400).json({message:"invalid credentials"})
       // return res.status(200).json(user)
    } catch(error){
        res.status(400).json(error)
    }

}

