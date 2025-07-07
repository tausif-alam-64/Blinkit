import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData , setEditData] = useState({
    name: "",
    image: ""
  })
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
      console.log(responseData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 rounded"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category, index) => {
          return (
            <div className="w-32 h-56 rounded shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down"
              />
              <div className=" items-center flex h-9 gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category)
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button onClick={() => setOpenDeleteConfirmBox(true)} className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {
        openDeleteConfirmBox && (
          <ConfirmBox close={() => setOpenDeleteConfirmBox(false)} />
        )
      }
    </section>
  );
};

export default CategoryPage;
