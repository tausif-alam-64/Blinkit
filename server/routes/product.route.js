import {Router} from "express"
import auth from "../middleware/auth.js"
import { createProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController } from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/create", auth, createProductController)
productRouter.post("/get", auth, getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subCategory" , getProductByCategoryAndSubCategory)

export default productRouter