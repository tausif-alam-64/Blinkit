import {Router} from "express"
import auth from "../middleware/auth.js"
import { createProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails } from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/create", auth, createProductController)
productRouter.post("/get", auth, getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subCategory" , getProductByCategoryAndSubCategory)
productRouter.post("/get-product-details", getProductDetails)

export default productRouter