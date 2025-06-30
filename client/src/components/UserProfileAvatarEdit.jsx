import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const UserProfileAvatarEdit = () => {

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded p-4 flex flex-col  justify-center items-center">
        <div className="w-20 h-20 bg-green-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm ">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegCircleUser size={65} />
          )}
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3">
              {
                loading ? "Loading..." : "Upload"
              }
            </div>
          </label>
          <input type="file" id="uploadProfile" className="hidden" />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
