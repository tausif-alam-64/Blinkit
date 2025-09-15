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

export const updateCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId
    const {_id, qty} = req.body

    if(!_id || !qty){
      return res.json({
        message : "provide _id, qty"
      })
    }

    const updateCartItem = await CartProductModel.updateOne({
      _id : _id,
      userId : userId
    }, {
      quantity : qty
    })

    return res.json({
      message : "Cart Updated",
      error : false,
      success : true,
      data : updateCartItem
    })

  } catch (error) {
    return res.status(500).json({
      message : error.message || error, 
      error : true,
      success : false
    })
  }
}

export const deleteCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId
    const {_id} = req.body

    if(!_id) {
      return res.json({
        message : "Provide _id first"
      })
    }

    const deleteCartItem = await CartProductModel.deleteOne({_id : _id, userId : userId})

    return res.json({
      message : "Item Removed",
      error : false,
      success : true,
      data : deleteCartItem
    })
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      success : false,
      error : true
    })
  }
}