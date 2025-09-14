import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import {setAllCategory, setAllSubCategory, setLoadingCategory} from "./store/productSlice"
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import GlobalProvider from "./provider/globalProvider";


const App = () => {
  
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data))
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
    </GlobalProvider>
  );
};

export default App;
