import React from "react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadImage = (e) => {
    const file = e.target.files[0]
    
    if(!file){
      return
    }

    
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
              <label htmlFor="productImage" className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer">
                <div className="text-center flex justify-center items-center flex-col">
                  <FaCloudUploadAlt size={35} />
                  <p>Upload Image</p>
                </div>
                <input type="file" id="productImage" className="hidden" onChange={handleUploadImage} accept="image/*" />
              </label>
              
              {/* display uploaded images */}
              <div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadProduct;
