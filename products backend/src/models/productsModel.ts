import {Request} from 'express'

export interface Product{
    ProductID: string,
    ProductName: string,
    ProductPrice:number,
    CategoryID: string
}

export interface ProductRequest extends Request{
    body:{
        ProductName: string,
        ProductPrice: number,
        CategoryID : string
    }
}

export interface ICategory{
    ID:string;
    Name:string;
}
export interface deletedCategory{
    ID:string;
    Name:string;
}
