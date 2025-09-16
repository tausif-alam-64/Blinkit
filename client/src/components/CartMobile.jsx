import React from "react";
import { useGlobalContext } from "../provider/globalProvider";
import { FaCaretRight, FaCartPlus } from "react-icons/fa";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartMobile = () => {
  const { totalPrice, totalQty } = useGlobalContext();

  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <>
      {cartItem[0] && (
        <div className=" p-2 sticky bottom-4">
          <div className="bg-green-700 px-2 py-1 rounded text-white lg:hidden text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit">
                <FaCartPlus />
              </div>
              <div className="text-xs">
                <p className="">{totalQty}</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>
            <Link to={"/cart"} className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded">
            <span className="text-sm ">View Cart</span>
            <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;
