import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import { toast } from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";

const UserManu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = (close) => {
    if (close) return close();
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {" "}
          {user.name || user.mobile}{" "}
        </span>
        <Link
          to={"/dashboard/profile"}
          onClick={handleClose}
          className="hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-1 ">
        <Link
          onClick={handleClose}
          to={"/dashboard/category"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Category
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/sub-category"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Sub Category
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/upload-product"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Upload Product
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/product"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Product
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>
        <button
          onClick={handleChange}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserManu;
