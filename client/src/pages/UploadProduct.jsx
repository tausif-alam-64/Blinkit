import React from "react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("")

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              value={data.name}
              name="name"
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter product description"
              value={data.name}
              name="description"
              onChange={handleChange}
              required
              rows={3}
              className="bg-blue-50 p-2 resize-none outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  onChange={handleUploadImage}
                  accept="image/*"
                />
              </label>

              {/* display uploaded images */}
              <div className=" flex flex-grow gap-1">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 mt-2 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="w-fit ml-auto absolute hidden group-hover:block right-0 top-0"
                      >
                        <IoClose
                          size={20}
                          className=" rounded-md cursor-pointer"
                        />
                      </div>
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageURL(img)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                id=""
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                return (
                  <div key={c._id + index} className="bg-blue-50 shadow-md p-1 m-1 flex items-center gap-2 rounded-md">
                    <p>{c.name}</p>
                    <div className="hover:bg-gray-200 rounded cursor-pointer" onClick={() => handleRemoveCategory(index)}>
                      <IoClose size={20}/>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                id=""
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find((el) => el._id === value);

                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value="" className="text-neutral-600">Select Sub Category</option>
                {allSubCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                return (
                  <div key={c._id + index} className="bg-blue-50 shadow-md p-1 m-1 flex items-center gap-2 rounded-md">
                    <p>{c.name}</p>
                    <div className="hover:bg-gray-200 rounded cursor-pointer" onClick={() => handleRemoveSubCategory(index)}>
                      <IoClose size={20}/>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>

        </form>
      </div>
      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}
    </section>
  );
};

export default UploadProduct;
