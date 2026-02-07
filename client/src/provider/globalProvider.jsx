import { createContext, useContext, useState, useEffect } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {DiscountPrice} from "../utils/DiscountPrice.js"
import { handleAddAddress } from "../store/addressSlice.js";
import { setOrder } from "../store/orderSlice.js";

const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0)

  const cartItem = useSelector((state) => state?.cartItem.cart);
  const user = useSelector((state) => state?.user)

  const hasAuth = () => {
    const token = localStorage.getItem("accessToken");
    return Boolean(token && user?._id)
  }

  const fetchCartItems = async () => {
    try {
      if(!hasAuth()) return;

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
    dispatch(handleAddAddress([]))
    dispatch(setOrder([]));
  };

  const fetchAddress = async () => {
    if(!hasAuth()) return;
    try {
      const response = await Axios({
        ...SummaryApi.getAddress,
      })
      const {data : responseData} = response

      if(responseData.success){
        dispatch(handleAddAddress(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const fetchOrder = async () => {
    if(!hasAuth()) return;
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      })
      const {data : responseData} = response

      if(responseData.success){
        dispatch(setOrder(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    if(hasAuth()){
      fetchCartItems();
      fetchAddress()
      fetchOrder()
    }else{
      dispatch(handleAddAddress([]));
      dispatch(handleAddItemCart([]));
      dispatch(setOrder([]))
    }
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
        fetchAddress,
        fetchOrder,
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
