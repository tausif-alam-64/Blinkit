import mongoose from "mongoose";
import CartProductModel from "../models/cartProduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import { response } from "express";
import Stripe from "../config/stripe.js";

export const CashOnDeliveryOrderController = async (req, res) => {
  try {
    const userId = req.userId;

    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const payload = list_items.map((el) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      };
    });

    const generatedOrder = await OrderModel.insertMany(payload);

    ///remove from the cart
    const removeCartItems = await CartProductModel.deleteMany({
      userId: userId,
    });
    const updateInUser = await UserModel.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );

    return res.json({
      message: "Order Successfully",
      error: false,
      success: true,
      data: generatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const pricewithDiscount = (price, dis = 1) => {
  const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100);
  const actualPrice = Number(price) - Number(discountAmout);
  return actualPrice;
};

export const paymentController = async (req, res) => {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const user = await UserModel.findById(userId);

    const line_items = list_items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.name,
            image: item.productId.image,
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount:
            pricewithDiscount(item.productId.price, item.productId.discount) *
            100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity : item.quantity
      };
    });

    const params = {
        submit_type : "pay",
        mode : 'payment',
        payment_method_types : ['card'],
        customer_email : user.email,
        metadata : {
            userId : userId,
            addressId : addressId
        },
        line_items : line_items,
        success_url : `${process.env.FRONTEND_URL}/success`,
        cancel_url : `${process.env.FRONTEND_URL}/cancel`

    }
    const session = await Stripe.checkout.sessions.create(params)

    return res.status(200).json(session)
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
