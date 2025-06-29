import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast";


const App = () => {
  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
