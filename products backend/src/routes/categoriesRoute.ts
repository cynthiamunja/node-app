import { Router } from 'express';
import { addCategories, getCategories, getOneCategory, deleteCategory,updateCategories } from '../controllers/categoriesController';

const categoriesRouter = Router();

// Define routes
categoriesRouter.get('', getCategories);
categoriesRouter.post('', addCategories);
categoriesRouter.get('/:id', getOneCategory);
categoriesRouter.delete('/:idDelete', deleteCategory);
categoriesRouter.put('/:id', updateCategories);
export default categoriesRouter;
