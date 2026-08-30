import { apiUrl, assetUrl } from "../../config/api";
import React, { useContext, useEffect, useState } from "react";
import ApplicationLogo from "../shared/ApplicationLogo";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "lucide-react";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setuploadedImage] = useState(null);

  useEffect(() => {
    if (user && user.profilePic) {
      setPreviewImage(assetUrl(user.profilePic));
    }
  }, [user]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle click outside modal to close it
  const handleClickOutside = (e) => {
    if (isModalOpen && e.target.classList.contains("fixed")) {
      setIsModalOpen(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setuploadedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (e) => {
    e.preventDefault();
    setPreviewImage(null);
    setuploadedImage("clear");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedImage) {
      console.error("No image uploaded");
      return;
    } else if (uploadedImage === "clear") {
      try {
        const token = localStorage.getItem("token");
        let res = await axios.put(
          apiUrl("/api/profile/photo"),
          { clear: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          console.log("Image cleared successfully");
          setIsModalOpen(false);
          setPreviewImage(null);
        }
      } catch (error) {
        console.error("Error clearing image:", error);
      }
      return;
    } else {
      const formData = new FormData();
      formData.append("profilePic", uploadedImage);

      try {
        const token = localStorage.getItem("token");
        let res = await axios.put(
          apiUrl("/api/profile/photo"),
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          console.log("Image uploaded successfully");
          setIsModalOpen(false);
          setPreviewImage(null);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="w-full h-24 border-b border-b-gray-600 bg-black p-4 flex items-center">
      <div className="flex justify-between w-full">
        <Link to={"/home"} className="flex items-center justify-center">
          <ApplicationLogo />
        </Link>

        <div className="flex gap-4 items-center cursor-pointer">
          <span className="">{user && user.username}</span>
          <div onClick={toggleModal}>
            {user?.profilePic ? (
              <img
                src={user && assetUrl(user.profilePic)}
                alt="pic"
                className="rounded-full object-cover w-8 h-8 bg-white"
              />
            ) : (
              <User color="#fff" />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/75 z-50"
          onClick={handleClickOutside}
        >
          <form className="bg-lighterBlack p-4 max-w-[300px] md:max-w-[500px] w-full">
            <h2 className=" text-primaryPurple-400 font-bold text-lg text-center">
              Update Profile Picture
            </h2>
            <p className="text-gray-300 mt-6 mb-2 text-sm">
              Upload your profile picture:{" "}
            </p>
            <label>
              <div
                className="w-full h-[200px] flex items-center justify-center"
                style={previewImage ? null : dottedBorderStyle}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <h6 className="text-primaryPurple-500 text-xs uppercase">
                    Click to browse
                  </h6>
                )}
              </div>
              <input onChange={(e) => handleFileChange(e)} type="file" hidden />
            </label>

            <div className="mt-4 flex items-center justify-end gap-2 flex-row w-full">
              <button
                onClick={(e) => handleClearImage(e)}
                className="w-fit text-xs border-2 border-primaryPurple-600 text-primaryPurple-400 font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700/25 hover:text-white active:bg-primaryPurple-600/75 transition-all duration-150"
              >
                Clear
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="w-fit text-xs bg-primaryPurple-600 text-white font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150"
              >
                Save Profile Picture
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const dottedBorderStyle = {
  border: "2px solid transparent",
  borderImage:
    "repeating-linear-gradient(to right,#c084fc 0, #c084fc 10px,transparent 10px,transparent 20px)",
  borderImageSlice: "1",
};

export default Topbar;
