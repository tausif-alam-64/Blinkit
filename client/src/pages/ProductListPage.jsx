import React from "react";
import { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import { useEffect } from "react";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux"

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [displaySubCategory, setDisplaySubCategory] = useState([])

  const params = useParams();

  const allSubCategory = useSelector(state => state.product.allSubCategory)
   console.log(allSubCategory)

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
    const sub = allSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })
      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, allSubCategory])

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[100px,1fr] md:grid-cols-[200px,1fr]">
        {/* sub category */}
        <div className=" min-h-[79vh] py-2 max-h-[79vh] overflow-scroll grid gap-2 shadow-md scrollBarCustom">
          {
            displaySubCategory.map((s,index) => {
              return (
                <div className="w-full p-2 bg-white">
                  <div className="w-fit mx-auto">
                    <img src={s.image} alt={s.name} className="w-20 h-full object-scale-down" />
                  </div>
                  <p className="-mt-5 text-xs text-center lg:text-base">
                    {s.name}
                  </p>
                </div>
              )
            })
          }
        </div>

        {/* product */}
        <div>
          <div className="bg-white shadow-md p-2">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="grid grid-cols-1 p-4 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {
                data.map((p, index) => {
                  return(
                    <CardProduct 
                     data={p}
                     key={p._id+"productsub"+index}
                     />
                  )
                })
              }
            </div>
            {loading && <Loading />}</div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
