import { Request, Response } from 'express';
import mssql from 'mssql';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';
import { Product, ProductRequest ,deletedCategory} from '../models/productsModel';
import { DbHelper } from '../DataBaseHelper'

const dbInstance=new DbHelper()

export const addProduct = async (req: ProductRequest, res: Response) => {
    try {
        // Generate unique ID for the product
        const id = uid();

        // Destructure the request body to get the required fields
        const { ProductName, ProductPrice, CategoryID } = req.body;

        await dbInstance.exec("addProduct",{ ProductID:id, ProductPrice, ProductName,CategoryID})
        console.log(id)
        // Send a success response
        res.status(201).json({ message: "Product created successfully" });

        // Make a request to the database
        // const pool = await mssql.connect(sqlConfig);
        
        // // Execute the stored procedure 'addProduct' with the correct parameter names
        // await pool.request()
        //      .input('ProductID', id)
        //     .input('ProductName', ProductName)
        //     .input('ProductPrice',  ProductPrice)
        //     .input('CategoryID', CategoryID)
        //     .execute('addProduct');

            
    } catch (error) {
        // Handle errors
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product', error });
    }
};

// Get products Controller
export const getProducts = async (req: Request, res: Response) => {
    const pool = await mssql.connect(sqlConfig);
    try {
        const result = await pool.request().execute('getProducts');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ message: 'couldnt get products' });
    } finally {
        pool.close();
    }
};

export async function getOneProduct  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        //console.log(id)
        const result = (await pool.request()
        .input('ProductID', id)

        .execute('getOneProduct')). recordset[0] as Product;

        if (result){
          return response.status(200).json(result)

    } else {
          return  response.status(200).send({message:"product not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}

//updateCategories
export async function updateProduct  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        const {ProductName,CategoryID,ProductPrice,ProductID}= request.body
        //console.log(id)
        console.log({ProductName})
        const result = (await pool.request()
        .input('ProductID', id)
        .input('CategoryID', CategoryID)
        .input('ProductName',ProductName)
        .input('ProductPrice', ProductPrice)
        .execute('updateProduct')). recordset[0] as Product;
        //console.log(id)
        if (result){
            return response.status(200).json(result)
    } else {
          return  response.status(200).send({message:"product not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}

export async function deleteProduct  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const idDelete = request.params.id
        //console.log(id)
        const result = (await pool.request()
        .input('ProductID', idDelete)
        .execute('deleteProduct')). recordset[0] as deletedCategory;
        console.log(idDelete)
        if (result){
          return response.status(200).send({message:"product deleted succesfully"})
    } else {
          return  response.status(200).send({message:"product not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}