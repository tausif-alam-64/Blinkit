import mongoose from "mongoose"
import CartProductModel from "../models/cartProduct.model.js"
import OrderModel from "../models/order.model.js"
import UserModel from "../models/user.model.js"
import { response } from "express"

export const CashOnDeliveryOrderController = async (req, res) => {
    try {
        const userId = req.userId

        const { list_items, totalAmt, addressId, subTotalAmt} = req.body

        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return res.json({
            message : "Order Successfully",
            error : false,
            success : true,
            data : generatedOrder
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}