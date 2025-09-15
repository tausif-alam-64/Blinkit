import React, { useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserManu from "./UserManu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/globalProvider";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const {totalPrice, totalQty} = useGlobalContext()

  const cartItem = useSelector((state) => state?.cartItem.cart);

  const user = useSelector((state) => state?.user);

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const isSearchPage = location.pathname === "/search";

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-50 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                alt="logo"
                width={170}
                height={60}
                className="hidden lg:block"
              />
              <img
                src={logo}
                alt="logo"
                width={170}
                height={60}
                className="lg:hidden"
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Search />
          </div>
          <div>
            {/* user icon display in only mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={26} />
            </button>

            {/* Destop version */}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center gap-1 select-none cursor-pointer text-lg px-2 "
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 shadow-lg">
                        <UserManu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2">
                  login
                </button>
              )}
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-2 py-2 rounded text-white">
                {/* Add to cart icons */}
                <div className="animate-bounce">
                  <BsCart4 size={25} />
                </div>
                <div className="font-semibold">
                  {
                    cartItem[0] ? (
                      <div>
                        <p className="text-slate-200">
                          {totalQty} Items
                        </p>
                        <p className="">{DisplayPriceInRupees(totalPrice)}</p>
                      </div>
                    ):(
                      <p>My Cart</p>
                    )
                  }
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
