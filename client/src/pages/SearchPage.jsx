import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothingYet.webp"

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation()
  const searchText = params?.search.slice(3)

  const loadingArrayCard = new Array(12).fill(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page : page,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((prev) => {
            return [...prev, ...responseData.data];
          });
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto container p-4">
        <p className="font-semibold">Search Results : {data.length}</p>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 py-4">
            {data.map((p, index) => {
              return <CardProduct data={p} key={p._id + "search" + index} />;
            })}
            
            {loading &&
              loadingArrayCard.map((_, index) => {
                return <CardLoading key={"loading" + index} />;
              })}
          </div>
        </InfiniteScroll>

        {
              //no Data
              !data[0] && !loading && (
                <div className="flex flex-col justify-center items-center w-full mx-auto">
                  <img src={noDataImage} alt="noDataImage" className="w-full h-full max-w-xs max-h-xs block" />
                  <p className="text-2xl font-semibold text-slate-600">No Data found ?</p>
                </div>
              )
            }
      </div>
    </section>
  );
};

export default SearchPage;
