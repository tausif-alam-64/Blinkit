import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header.";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import {setAllCategory, setAllSubCategory, setLoadingCategory} from "./store/productSlice"
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import GlobalProvider from "./provider/globalProvider";
import CartMobile from "./components/CartMobile";


const App = () => {

  const dispatch = useDispatch();
  const location = useLocation()

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if(!token) return;
    try {
      const userData = await fetchUserDetails();
      if(userData?.success && userData?.data){
        dispatch(setUserDetails(userData.data))
      }
      
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
    
  }

   const fetchCategory = async () => {
      try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
          ...SummaryApi.getCategory,
        });
  
        const { data: responseData } = response;
        if (responseData.success) {
          dispatch(setAllCategory(responseData.data))
        }
      } catch (error) {
        return console.error("error while fetching category", error)
      }finally{
        dispatch(setLoadingCategory(false))
      }
    };
    const fetchSubCategory = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getSubCategory,
        });
  
        const { data: responseData } = response;
  
        if (responseData.success) {
          dispatch(setAllSubCategory(responseData.data))
        }
      } catch (error) {
        return console.error("error while fetching category", error)
      }
    };
    
  

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, [])


  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname !== '/checkout' && (
          <CartMobile />
        )
      }
       
    </GlobalProvider>
  );
};

export default App;
