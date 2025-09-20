import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/globalProvider";

const EditAddressDetails = ({ close, data }) => {
  const { fetchAddress } = useGlobalContext();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _id: data._id,
      address_line: data.address_line,
      address_line: data.address_line,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      mobile: data.mobile,
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: {
            ...data,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
          reset();
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="bg-black fixed top-0 left-0 right-0 bottom-0 bg-opacity-70 z-50 h-screen overflow-auto">
      <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-semibold">Edit Address</h2>
          <button
            className="bg-slate-200 rounded hover:bg-slate-300 cursor-pointer"
            onClick={close}
          >
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=" mt-4 grid gap-4">
          <div className="grid gap-1">
            <label htmlFor="addressline">Address Line :</label>
            <input
              type="text"
              id="addressline"
              className=" border bg-blue-50 p-2 rounded"
              {...register("address_line", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="city">City :</label>
            <input
              type="text"
              id="city"
              className="border bg-blue-50 p-2 rounded"
              {...register("city", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="state">State :</label>
            <input
              type="text"
              id="state"
              className="border bg-blue-50 p-2 rounded"
              {...register("state", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="pincode">Pincode :</label>
            <input
              type="text"
              id="pincode"
              className="border bg-blue-50 p-2 rounded"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="country">Country :</label>
            <input
              type="text"
              id="country"
              className="border bg-blue-50 p-2 rounded"
              {...register("country", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile No. :</label>
            <input
              type="text"
              id="mobile"
              className="border bg-blue-50 p-2 rounded"
              {...register("mobile", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="bg-primary-200 w-full py-2 font-semibold mt-4 hover:bg-primary-100"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAddressDetails;
