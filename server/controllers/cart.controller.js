import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(402).json({
        message: "Provide ProductId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(402).json({
        message: "Product already exist",
        error: true,
        success: false,
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });

    const save = await cartItem.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return res.json({
        data : save, 
        message : " Item added Successfully",
        error : false,
        success: true
    })

  } catch (error) {
    return res.json(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCartItemController = async (req, res) => {
    try{
        const userId = req.userId

        const cartItem = await CartProductModel.find({
            userId : userId,
        }).populate("productId")

        return res.json({
            data : cartItem,
            error : false,
            success : true
        })
    }catch(error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success :false
        })
    }
}