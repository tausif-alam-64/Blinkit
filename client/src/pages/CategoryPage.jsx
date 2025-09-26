import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import UploadCategoryModel from "../components/UploadCategoryModel";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import NoData from "../components/NoData";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  // Modal states
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  // Data states
  const [categoryData, setCategoryData] = useState([]);
  const [editData, setEditData] = useState({ name: "", image: "" });
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });
  const [loading, setLoading] = useState(false);

  // Fetch categories from API
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getCategory });
      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete category handler
  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCategory();
        setOpenDeleteConfirmBox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
        >
          Add Category
        </button>
      </div>

      {/* No Data */}
      {!loading && categoryData.length === 0 && <NoData />}

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-52 object-scale-down"
            />
            <div className="flex justify-between items-center p-2 gap-2">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className="flex-1 py-1 text-green-700 bg-green-100 hover:bg-green-200 rounded transition font-medium text-center"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenDeleteConfirmBox(true);
                  setDeleteCategory(category);
                }}
                className="flex-1 py-1 text-red-700 bg-red-100 hover:bg-red-200 rounded transition font-medium text-center"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {openUploadCategory && (
        <UploadCategoryModel
          close={() => setOpenUploadCategory(false)}
          fetchData={fetchCategory}
        />
      )}
      {openEdit && (
        <EditCategory data={editData} close={() => setOpenEdit(false)} />
      )}
      {openDeleteConfirmBox && (
        <ConfirmBox
          close={() => setOpenDeleteConfirmBox(false)}
          cancel={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
