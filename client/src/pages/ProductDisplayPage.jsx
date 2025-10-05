import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Divider from "../components/Divider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { DiscountPrice } from "../utils/DiscountPrice";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params.product?.split("-").slice(-1)[0];
  const [image, setImage] = useState(0);
  const [data, setData] = useState({ name: "", image: [] });
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId },
      });
      const { data: responseData } = response;
      if (responseData.success) setData(responseData.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 150;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 150;
  };

  return (
    <section className="container mx-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ===== Left: Product Image Section ===== */}
        <div className="flex flex-col items-center gap-4">
          {/* Main Image */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex items-center justify-center w-full h-[45vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] transition-all duration-300 hover:shadow-md">
            {data.image?.[image] ? (
              <img
                src={data.image[image]}
                alt={data.name}
                className="object-contain h-full w-full p-4"
              />
            ) : (
              <div className="text-gray-400 text-center">Loading...</div>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-2">
            {data.image.map((_, index) => (
              <span
                key={index}
                onClick={() => setImage(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  image === index ? "bg-green-600 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Scroll */}
          {data.image.length > 1 && (
            <div className="relative w-full">
              <div
                ref={imageContainer}
                className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none px-1 sm:px-2"
              >
                {data.image.map((img, index) => (
                  <div
                    key={img + index}
                    onClick={() => setImage(index)}
                    className={`min-w-[70px] sm:min-w-[80px]  md:min-w-[90px] h-[70px] sm:h-[80px] md:h-[90px] flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer border transition-all ${
                      image === index
                        ? "border-green-600 scale-105"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="overflow-hidden h-14 sm:h-16 "
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handleScrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={handleScrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </div>

        {/* ===== Right: Product Info Section ===== */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="bg-green-100 text-green-700 font-medium w-fit px-3 py-1 rounded-full text-xs sm:text-sm">
              10 Min Delivery
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              {data.name}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">{data.unit}</p>
          </div>

          <Divider />

          {/* Price */}
          <div>
            <p className="text-gray-500 mb-1 font-medium text-sm">Price</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-green-700">
                {DisplayPriceInRupees(DiscountPrice(data.price, data.discount))}
              </span>
              {data.discount > 0 && (
                <>
                  <span className="line-through text-gray-400 text-sm sm:text-base">
                    {DisplayPriceInRupees(data.price)}
                  </span>
                  <span className="text-green-600 font-semibold text-sm sm:text-base">
                    {data.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Cart */}
          {data.stock === 0 ? (
            <p className="text-red-500 font-medium">Out of Stock</p>
          ) : (
            <div className="w-full sm:w-auto">
              <AddToCartButton data={data} />
            </div>
          )}

          <Divider />

          {/* Why shop */}
          <div>
            <h2 className="font-semibold text-gray-800 text-lg mb-3">
              Why shop from Blinkeyit?
            </h2>
            <div className="space-y-5">
              {[
                {
                  img: image1,
                  title: "Superfast Delivery",
                  desc: "Delivered at lightning speed from nearby stores.",
                },
                {
                  img: image2,
                  title: "Best Price Offers",
                  desc: "Enjoy direct deals and genuine savings.",
                },
                {
                  img: image3,
                  title: "Wide Assortment",
                  desc: "5000+ everyday essentials to choose from.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Description & More Details */}
          <div className="space-y-3 text-sm sm:text-base">
            {data.description && (
              <>
                <h3 className="font-semibold text-gray-800">Description</h3>
                <p className="text-gray-600">{data.description}</p>
              </>
            )}
            {data.unit && (
              <>
                <h3 className="font-semibold text-gray-800">Unit</h3>
                <p className="text-gray-600">{data.unit}</p>
              </>
            )}
            {data?.more_details &&
              Object.entries(data.more_details).map(([key, val], idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-gray-800">{key}</h3>
                  <p className="text-gray-600">{val}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
