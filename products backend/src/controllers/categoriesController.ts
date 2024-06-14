import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import mssql from 'mssql';
import { CategoriesRequest, ICategory,deletedCategory } from '../models/categoriesModel';
import { sqlConfig } from '../config';
import { log } from 'console';

// Get Categories Controller
export const getCategories = async (req: Request, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {
        const result = await pool.request().execute('getCategories');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ message: 'couldnt get categories' });
    } finally {
        pool.close();
    }
};


export const addCategories=async(req:CategoriesRequest, res:Response)=>{
    try {
       
        //id
        const id =uid()
        const {CategoryName}= req.body
        console.log(req.body);
        
        //make request to DB
        //connection
        const pool= await mssql.connect(sqlConfig)
        //make a request
        await pool.request()
        .input("CategoryID",id)
        .input("CategoryName",CategoryName)
        .execute('addCategories')
 
        res.status(201).json({message:"category Created"})
 
    } catch (error) {
       
        res.status(500).json(error)
    }
}
 

export async function getOneCategory  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        //console.log(id)
        const result = (await pool.request()
        .input('CategoryID', id)
        .execute('getOneCategory')). recordset[0] as ICategory;

        if (result){
          return response.status(200).json(result)

    } else {
          return  response.status(200).send({message:"category not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}
export async function deleteCategory  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const idDelete = request.params.id
        //console.log(id)
        const result = (await pool.request()
        .input('CategoryID', idDelete)
        .execute('deleteCategory')). recordset[0] as deletedCategory;
        console.log(idDelete)
        if (result){
          return response.status(200).send({message:"category deleted succesfully"})
    } else {
          return  response.status(200).send({message:"category not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}
//updateCategories
export async function updateCategories  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        const {CategoryName}= request.body
        console.log(id)
        console.log({CategoryName})
        const result = (await pool.request()
        .input('CategoryID', id)
        .input('CategoryName',CategoryName)
        .execute('updateCategories')). recordset[0] as ICategory;
        console.log(id)
        if (result){
            return response.status(200).json(result)
    } else {
          return  response.status(200).send({message:"category not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}
