import {Router } from 'express'
import {addProduct,getProducts,getOneProduct,updateProduct,deleteProduct} from '../controllers/productsController'
import { verifyToken  } from '../middlewares'

const productRouter = Router()

productRouter.post("", addProduct)
productRouter.get("/:id", getOneProduct)
productRouter.get("",verifyToken, getProducts)
productRouter.put("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)


export default productRouter