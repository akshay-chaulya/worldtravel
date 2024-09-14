import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ProfileLogo from "./ProfileLogo";

const ProfileImageInputFiled = ({ onChange }) => {
  const [filePreview, setFilePreview] = useState(null);
  function handleOnChage(e) {
    onChange(e);
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFilePreview(preview);
    }
  }

  return (
    <div className="self-center mb-2 relative">
      <ProfileLogo className="scale-[1.3]" url={filePreview} />
      <input
        className="file:text-transparent absolute bottom-0 w-full file:h-full file:bg-inherit file:text-none file:border-none file:cursor-pointer"
        type="file"
        onChange={handleOnChage}
      />
      {!filePreview && (
        <FaRegEdit className="absolute top-[80%] left-[75%] h-2 text-gray-500" />
      )}
    </div>
  );
};

export default ProfileImageInputFiled;
