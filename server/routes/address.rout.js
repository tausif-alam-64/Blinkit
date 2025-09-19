import {Router} from "express"
import auth from "../middleware/auth.js"
import { addAddresscontroller, getAddresscontroller } from "../controllers/address.controller.js"

const addressRouter = Router()

addressRouter.post("/create", auth, addAddresscontroller)
addressRouter.get("/get", getAddresscontroller)

export default addressRouter