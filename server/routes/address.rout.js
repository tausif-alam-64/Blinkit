import {Router} from "express"
import auth from "../middleware/auth.js"
import { addAddresscontroller, deleteAddressController, getAddresscontroller, updateAddressController } from "../controllers/address.controller.js"

const addressRouter = Router()

addressRouter.post("/create", auth, addAddresscontroller)
addressRouter.get("/get",auth, getAddresscontroller)
addressRouter.put("/update-address", auth, updateAddressController)
addressRouter.put("/delete-address", auth, deleteAddressController)

export default addressRouter