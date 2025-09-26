import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const response = await uploadImage(file);
    setLoading(false);

    setSubCategoryData((prev) => ({ ...prev, image: response.data.url }));
  };

  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c._id !== categoryId),
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        close && close();
        fetchData && fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Sub Category
          </h2>
          <button
            onClick={close}
            className="p-1 rounded hover:bg-gray-200 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmitSubCategory}>
          {/* Subcategory Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="subCategoryName" className="text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="subCategoryName"
              name="name"
              value={subCategoryData.name}
              onChange={handleOnChange}
              placeholder="Enter subcategory name"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <p className="text-gray-700">Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="bg-white h-36 w-full lg:w-36 rounded flex items-center justify-center">
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    alt="subcategory"
                    className="w-full h-full object-scale-down rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className={`px-4 py-2 rounded border text-center transition cursor-pointer ${
                    !subCategoryData.name || loading
                      ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white border-blue-400 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadSubCategoryImage}
                  disabled={!subCategoryData.name || loading}
                />
              </label>
            </div>
          </div>

          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Select Category</label>
            <div className="border rounded p-2 focus-within:ring-2 focus-within:ring-blue-400">
              {/* Selected categories */}
              <div className="flex flex-wrap gap-2 mb-2">
                {subCategoryData.category.map((cate) => (
                  <div
                    key={cate._id}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md flex items-center gap-1 shadow-sm"
                  >
                    {cate.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategorySelected(cate._id)}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <IoClose size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dropdown */}
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) return;
                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );
                  if (
                    subCategoryData.category.some((c) => c._id === value)
                  ) return;
                  setSubCategoryData((prev) => ({
                    ...prev,
                    category: [...prev.category, categoryDetails],
                  }));
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              !subCategoryData.name ||
              !subCategoryData.image ||
              subCategoryData.category.length === 0
            }
            className={`py-2 rounded font-medium text-white transition ${
              subCategoryData.name &&
              subCategoryData.image &&
              subCategoryData.category.length
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
