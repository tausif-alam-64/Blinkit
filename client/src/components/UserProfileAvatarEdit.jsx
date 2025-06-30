import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updatedAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";


const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setLoading(true);

    try {
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });

      const {data : responseData} = response;

      dispatch(updatedAvatar(responseData.data.avatar))

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded p-4 flex flex-col  justify-center items-center">
        <button onClick={close} className="text-neutral-800 w-fit block ml-auto">
          <IoClose size={20}/>
        </button>
        <div className="w-20 h-20 bg-green-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm ">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegCircleUser size={65} />
          )}
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer">
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"
            accept="image/*"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
