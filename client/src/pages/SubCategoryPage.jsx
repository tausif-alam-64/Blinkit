import React, { useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useEffect } from "react";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { LuPencil } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState("")

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        console.log("row", row.original.image);
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setImageURL(row.original.image)
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({row}) => {
        return <>
         {
          row.original.category.map((c, index) => {
            return(
              <p key={c._id+"table"} className="inline-block shadow-md px-2 rounded-md">{c.name} </p>
            )
          })
         }
        </>
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell : ({row}) => {
        return(
        <div className="flex items-center justify-center gap-3">
          <button className="p-2 bg-green-100 rounded-full hover:text-green-600">
            <LuPencil size={20} />
          </button>
          <button className="p-2 bg-red-100 rounded-full hover:text-red-600">
            <MdDelete size={20} />
          </button>
        </div>)
      }
    })
  ];

  console.log("SubCategoryData", data);
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Sub Category
        </button>
      </div>
      <div>
        <DisplayTable data={data} column={column} />
      </div>
      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} />
      )}

      {
        imageURL &&
        <ViewImage url={imageURL} close={() => setImageURL("") } />
      }
    </section>
  );
};

export default SubCategoryPage;
