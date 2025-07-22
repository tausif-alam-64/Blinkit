import { Router } from "express"
import auth from "../middleware/auth.js"
import { addSubCategoryController, getSubCategoryController } from "../controllers/subCategory.controller.js"

const subCategoryRouter = Router()

subCategoryRouter.post("/create",auth, addSubCategoryController)
subCategoryRouter.post("/get", getSubCategoryController)

export default subCategoryRouter