import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/globalProvider";
import { useSelector } from "react-redux";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { DiscountPrice } from "../utils/DiscountPrice";
import AddToCartButton from "./AddToCartButton";
import { FaCaretRight } from "react-icons/fa";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  const redirectToCheckOutPage = () => {
    if(user?._id) {
      navigate("/checkout")
      if(close){
        close()
      }
      return
    }
  }

  return (
    <section className="bg-neutral-900 fixed top-0 left-0 right-0 bottom-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link
            to={"/"}
            className="lg:hidden bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <IoClose size={25} />
          </Link>
          <button
            onClick={close}
            className="hidden lg:block bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/* display Items */}
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100  text-blue-500 rounded-full">
                <p>Your total saving</p>
                <p>
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={item?._id + "cartItemDisplay"}
                        className="flex w-full gap-4"
                      >
                        <div>
                          <img
                            src={item?.productId?.image[0]}
                            alt=""
                            className="object-scale-down"
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold">
                            {DisplayPriceInRupees(
                              DiscountPrice(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill Details</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Items total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span>{" "}
                    <span>{DisplayPriceInRupees(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Quantity total</p>
                  <p className="flex items-center gap-2">{totalQty}</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Carge</p>
                  <p className="flex items-center gap-2">Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand Total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div>
              <img
                src={imageEmpty}
                className="w-full h-full object-scale-down"
                alt=""
              />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-600 px-4 py-2 text-white rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInRupees(totalPrice)}</div>
              <button onClick={() => redirectToCheckOutPage()} className="flex items-center gap-1">
                Proceed{" "}
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
