import { apiUrl } from "../../config/api";
import { useContext, useState, useEffect } from "react";
import { User, Lock, Bell } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Setting = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    setUpdateMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        apiUrl("/api/profile/update"),
        {
          username: formData.username,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUpdateMessage("Profile updated successfully!");
        setTimeout(() => setUpdateMessage(""), 3000);
      }
    } catch (error) {
      console.error("Update failed:", error);
      setUpdateMessage("Failed to update profile. Please try again.");
      setTimeout(() => setUpdateMessage(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResetPassword = async () => {
    setIsResetting(true);
    setResetMessage("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setResetMessage("Authentication token not found. Please log in again.");
        setIsResetting(false);
        return;
      }
      const response = await axios.post(
        apiUrl("/api/profile/reset-password"),
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setResetMessage("Password reset successfully!");
        setPasswordData({ oldPassword: "", newPassword: "" });
        setTimeout(() => setResetMessage(""), 3000);
      } else {
        setResetMessage("Failed to reset password. Please try again.");
        setTimeout(() => setResetMessage(""), 3000);
      }
    } catch (error) {
      console.error("Password reset error:", error, error?.response);
      setResetMessage(
        error?.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
      setTimeout(() => setResetMessage(""), 3000);
    } finally {
      setIsResetting(false);
    }
  };

  const settings = [
    {
      title: "Personal Information",
      icon: <User size={16} />,
      content: (
        <>
          <div className="mb-4">
            <label className="block text-sm text-gray-300">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter your username"
              style={{ backgroundColor: "var(--color-lighterBlack)" }}
              className="mt-2 w-full px-3 py-2 rounded-md text-gray-200 focus:outline-none focus:ring focus:ring-primaryPurple-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              style={{ backgroundColor: "var(--color-lighterBlack)" }}
              className="mt-2 w-full px-3 py-2 rounded-md text-gray-200 focus:outline-none focus:ring focus:ring-primaryPurple-400"
            />
          </div>
          {updateMessage && (
            <div
              className={`mt-2 text-sm ${
                updateMessage.includes("success")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {updateMessage}
            </div>
          )}
        </>
      ),
      action: "Update Info",
      onClick: handleUpdateProfile,
      isLoading: isUpdating,
    },
    {
      title: "Security",
      icon: <Lock size={16} />,
      content: (
        <>
          <div className="mb-4">
            <label className="block text-sm text-gray-300">
              Previous Password
            </label>
            <input
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                handlePasswordChange("oldPassword", e.target.value)
              }
              placeholder="Enter previous password"
              style={{ backgroundColor: "var(--color-lighterBlack)" }}
              className="mt-2 w-full px-3 py-2 rounded-md text-gray-200 focus:outline-none focus:ring focus:ring-primaryPurple-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              placeholder="Enter new password"
              style={{ backgroundColor: "var(--color-lighterBlack)" }}
              className="mt-2 w-full px-3 py-2 rounded-md text-gray-200 focus:outline-none focus:ring focus:ring-primaryPurple-400"
            />
          </div>
          {resetMessage && (
            <div
              className={`mt-2 text-sm ${
                resetMessage.includes("success")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {resetMessage}
            </div>
          )}
        </>
      ),
      action: "Change Password",
      onClick: handleResetPassword,
      isLoading: isResetting,
    },
    {
      title: "Notifications",
      icon: <Bell size={16} />,
      content: (
        <>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Email Notifications</span>
            <input
              type="checkbox"
              className="form-checkbox bg-gray-800 text-primaryPurple-400 focus:ring-primaryPurple-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Do Not Disturb Mode</span>
            <input
              type="checkbox"
              className="form-checkbox bg-gray-800 text-primaryPurple-400 focus:ring-primaryPurple-400"
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-5xl font-semibold">Settings</h1>
      <p className="text-gray-400 mt-2 max-w-xl">
        Customize your dashboard preferences, manage notifications, and adjust
        security settings to suit your needs.
      </p>

      <div
        className="grid grid-cols-3 mt-8 gap-4 rounded-md border border-gray-700 shadow-md"
        style={{ backgroundColor: "var(--color-lightBlack)" }}
      >
        {settings.map((setting, index) => (
          <div
            key={index}
            className="p-4 rounded-md border border-gray-700"
            style={{ backgroundColor: "var(--color-lightBlack)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              {setting.icon}
              <h2 className="text-lg font-medium text-white">
                {setting.title}
              </h2>
            </div>{" "}
            <div className="mb-4">{setting.content}</div>
            {setting.action && (
              <button
                onClick={setting.onClick}
                disabled={setting.isLoading}
                className="px-4 py-2 bg-primaryPurple-400 text-black rounded-md hover:bg-primaryPurple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {setting.isLoading
                  ? setting.action === "Change Password"
                    ? "Resetting..."
                    : "Updating..."
                  : setting.action}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setting;
