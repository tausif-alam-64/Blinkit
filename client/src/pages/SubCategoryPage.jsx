import React, { useState, useEffect } from "react";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { createColumnHelper } from "@tanstack/react-table";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import DisplayTable from "../components/DisplayTable";
import ViewImage from "../components/ViewImage";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/ConfirmBox";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: "" });
  const [editData, setEditData] = useState({ _id: "" });

  const columnHelper = createColumnHelper();

  // Fetch subcategories
  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getSubCategory });
      if (response.data.success) setData(response.data.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  // Table columns
  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-10 h-10 rounded cursor-pointer"
            onClick={() => setImageURL(row.original.image)}
          />
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.category.map((c) => (
            <span
              key={c._id}
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm shadow-sm"
            >
              {c.name}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              setOpenEdit(true);
              setEditData(row.original);
            }}
            className="p-2 bg-green-100 rounded-full text-green-600 hover:text-green-700 transition"
          >
            <HiPencil size={20} />
          </button>
          <button
            onClick={() => {
              setOpenDeleteConfirmBox(true);
              setDeleteSubCategory(row.original);
            }}
            className="p-2 bg-red-100 rounded-full text-red-600 hover:text-red-700 transition"
          >
            <MdDelete size={20} />
          </button>
        </div>
      ),
    }),
  ];

  // Delete handler
  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow mb-4 gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Sub Categories</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Add Sub Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto w-full max-w-full">
        <DisplayTable data={data} column={columns} loading={loading} />
      </div>

      {/* Modals */}
      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />}

      {openEdit && (
        <EditSubCategory
          fetchData={fetchSubCategory}
          data={editData}
          close={() => setOpenEdit(false)}
        />
      )}

      {openDeleteConfirmBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
