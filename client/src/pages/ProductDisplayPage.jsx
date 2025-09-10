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

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params.product?.split("-").slice(-1)[0];

  const [image, setImage] = useState(0);
  const [data, setData] = useState({
    name: "",
    image: [],
  });

  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
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
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">
      <div className="">
        <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
          <img
            src={data.image[image]}
            className="h-full w-full object-scale-down"
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((img, index) => {
            return (
              <div
                className={`bg-slate-200 w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 rounded-full ${
                  index === image && "bg-slate-300"
                }`}
                key={img + index + "point"}
              ></div>
            );
          })}
        </div>
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex gap-4 relative z-10 w-full overflow-x-auto scrollbar-none scroll-smooth"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className="w-20 h-20 min-w-20 min-h-20 shadow-md cursor-pointer"
                  key={img + index}
                >
                  <img
                    src={img}
                    alt="min-product"
                    onClick={() => setImage(index)}
                    className="w-full h-full object-scale-down "
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full -ml-3 h-full flex justify-between absolute items-center">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <p>{data.unit}</p>
        <Divider />
        <div>
          <p>Price</p>
          <div>
            <p>{DisplayPriceInRupees(data.price)}</p>
          </div>
        </div>

        {
          data.stock === 0 ? (
            <p className="text-lg text-red-500">Out of stock</p>
          ) : (
             <button className="my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded">
          Add
        </button>
          )
        }
       

        <Divider />

        <h2 className="font-semibold">Why shop from binkeyit?</h2>
        <div>
          <div className="flex items-center gap-4 my-4">
            <img src={image1} alt="superfast delivery" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Superfast Delivery</div>
              <p>
                Get your order delivered to your doorstep at the earlist from
                dark stores near you
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image2} alt="Best price offers" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Best price offers</div>
              <p>
                Best price destination with offers directly from the
                manufacturers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image3} alt="Wide Assorment" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Wide Assorment</div>
              <p>
                Choose from 5000+ products across food personal care, household
                & other category
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
