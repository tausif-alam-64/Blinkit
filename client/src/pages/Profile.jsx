import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const Profile = () => {
    const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false)
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="w-20 h-20 bg-green-200 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegCircleUser size={65} />
        )}
      </div>
      <button onClick={() => setOpenProfileAvatarEdit(true)} className="text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3">
        Edit
      </button>
      {
        openProfileAvatarEdit && (
            <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)}/>
        )
      }
    </div>
  );
};

export default Profile;
