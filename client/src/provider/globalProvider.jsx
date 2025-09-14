import { createContext, useContext } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import { useEffect } from "react";

const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    fetchCartItems()
  }, [])

  return <GlobalContext.Provider value={{fetchCartItems}}>
    {children}
  </GlobalContext.Provider>;
};

export default GlobalProvider;