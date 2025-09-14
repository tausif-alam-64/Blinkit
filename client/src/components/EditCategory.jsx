import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    
    setLoading(true)
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setLoading(false)

    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse?.data?.url,
      };
    });
  };

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Update Category</h1>
          <button onClick={close} className="w-fit block ml-auto ">
            <IoClose size={25} />
          </button>
        </div>
        <form className="mx-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div className="gird gap-1 ">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    !data.name
                      ? "bg-gray-300"
                      : "border-primary-200 hover:bg-primary-100"
                  } px-4 py-2 rounded cursor-pointer border `}
                >
                  {loading ? "Loading..." : "Upload Image"}
                </div>
                <input
                  type="file"
                  disabled={!data.name}
                  id="uploadCategoryImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>
          <button
            className={`${
              data.image && data.name
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300 "
            } py-2 font-semibold `}
          >
            Update Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
