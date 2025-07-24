import React, { useState } from "react";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id : data._id,
    name: data.name,
    image: data.image,
    category: data.category || []
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
        const response = await Axios({
            ...SummaryApi.updateSubCategory,
            data: subCategoryData
        })

        const { data: responseData} = response
        if(responseData.success){
            toast.success(responseData.message)
            if(close){
                close()
            }
            if(fetchData){
                fetchData()
            }
        }
    } catch (error) {
        AxiosToastError(error)
    }
  }

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button onClick={close} className="w-fit block ml-auto ">
            <IoClose size={25} />
          </button>
        </div>
        <form className="mx-3 grid gap-2" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="SubCategoryName">Name</label>
            <input
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
              type="text"
              id="SubCategoryName"
              placeholder="Enter category name"
              value={subCategoryData.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div className="gird gap-1 ">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    alt="subCategory"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No image</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className={`${
                    !subCategoryData.name
                      ? "bg-gray-300"
                      : "border-primary-200 hover:bg-primary-100"
                  } px-4 py-2 rounded cursor-pointer border `}
                >
                  Upload Image
                </div>
                <input
                  type="file"
                  disabled={!subCategoryData.name}
                  id="uploadSubCategoryImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/* display value */}
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cate, index) => {
                  return (
                    <p
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2 rounded-md"
                      key={cate._id + "SelectedValue"}
                    >
                      {cate.name}
                      <div
                        className="cursor-pointer hover:bg-gray-200 rounded"
                        onClick={() => handleRemoveCategorySelected(cate._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>

              {/* select Category */}

              <select
                name=""
                id=""
                className="w-full p-2 bg-transparent outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );
                  setSubCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value="">
                  Select Category
                </option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category?._id + "subcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className={`${
              subCategoryData?.image &&
              subCategoryData?.name &&
              subCategoryData?.category[0]
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300 "
            } py-2 font-semibold `}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
