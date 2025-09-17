import { createContext, use, useContext } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import { useEffect } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSelector } from "react-redux";
import {DiscountPrice} from "../utils/DiscountPrice.js"

const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0)

  const cartItem = useSelector((state) => state?.cartItem.cart);
  const user = useSelector((state) => state?.user)

  const fetchCartItems = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItems,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleLogOut = () => {
    localStorage.clear()
    dispatch(handleAddItemCart([]))
  }

  useEffect(() => {
    fetchCartItems();
    handleLogOut()
  }, [user]);

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const totalPrice = cartItem.reduce((prev, curr) => {
      const priceAfterDiscount = DiscountPrice(curr?.productId?.price, curr?.productId?.discount)
      return prev + (priceAfterDiscount * curr.quantity);
    }, 0);

    setTotalPrice(totalPrice);

    const notDiscountPrice = cartItem.reduce((prev, curr) => {
      return prev + (curr?.productId?.price * curr.quantity)
    }, 0)
    setNotDiscountTotalPrice(notDiscountPrice)
  }, [cartItem]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItems,
        updateQuantity,
        deleteCartItem,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
