import React from "react";
import { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import { useEffect } from "react";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const params = useParams();

  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  console.log(allSubCategory);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];
  const subCategoryName = params.subCategory
    ?.replace(/-\w+$/, "")
    .replace(/-/g, " ");

  const fetchProductData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);
  useEffect(() => {
    const sub = allSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, allSubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[100px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* sub category */}
        <div className=" min-h-[88vh] py-2 bg-white max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollBarCustom">
          {displaySubCategory.map((s, index) => {
            const link = `/${validURLConvert(s.category[0]?.name)}-${
              s?.category[0]?._id
            }/${validURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                to={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${
                  subCategoryId === s._id ? "bg-green-100" : ""
                }`}
              >
                <div className="w-fit max-w-28 lg:mx-0 rounded box-border mx-auto bg-white">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-5 text-xs text-center lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* product */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-2 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] mix-h-[80vh] overflow-y-auto relative">
              <div className="grid grid-cols-1 p-4 gap-4 md:grid-cols-3 lg:grid-cols-5 ">
                {data.map((p, index) => {
                  return (
                    <CardProduct data={p} key={p._id + "productsub" + index} />
                  );
                })}
              </div>
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
