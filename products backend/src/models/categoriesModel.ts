import { Request } from 'express';

export interface CategoriesRequest extends Request {
    body: {
        CategoryName: string;
    };
}

export interface ICategory{
    ID:string;
    Name:string;
}
export interface deletedCategory{
    ID:string;
    Name:string;
}
