import { Router } from "express"
import auth from "../middleware/auth.js"
import { addSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js"

const subCategoryRouter = Router()

subCategoryRouter.post("/create",auth, addSubCategoryController)
subCategoryRouter.post("/get", getSubCategoryController)
subCategoryRouter.put("/update", auth,updateSubCategoryController)

export default subCategoryRouter