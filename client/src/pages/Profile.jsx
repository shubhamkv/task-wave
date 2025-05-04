import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const getInitials = (name) => {
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0]
    : `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [newPasswordUI, setNewPasswordUI] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleChangePassword = async () => {
    try {
      await axiosInstance.post("/otp/send", {
        username: user.username,
      });

      setShowOTPInput(true);
      toast.info("Enter OTP sent to your email");
    } catch (err) {
      toast.error("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axiosInstance.post("/otp/verify", {
        username: user.username,
        otp,
      });
      toast.success(res.data.msg || "OTP Verified");
      setNewPasswordUI(true);
    } catch (error) {
      console.error("Error message: ", error);
      toast.error("Error while verifying OTP");
    }
    setShowOTPInput(false);
  };

  const updatePassword = async () => {
    try {
      await axiosInstance.put("/user/profile", { newPassword });
      toast.success("Password updated successfully");
    } catch (error) {
      console.error("Erorr message: ", error);
      toast.error("Unable to update password");
    }
    setNewPasswordUI(false);
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mt-10 transition-all">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center">
        <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
          {getInitials(user.name)}
        </div>
        <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
          {user.name}
        </h2>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-4 text-sm sm:text-base">
        {/* Username */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Username:
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {user.username}
          </span>
        </div>

        {/* Focus Streak */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Focus Streak:
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {user.focusStreak}
          </span>
        </div>
      </div>

      {/* Password Section */}
      <div className="mt-6">
        {showOTPInput ? (
          <>
            {/* OTP Input */}
            <div className="flex flex-col items-center gap-3 w-full">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Enter OTP sent to your email
              </label>
              <div className="relative w-full">
                <input
                  type={showOtp ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
                  onClick={() => setShowOtp(!showOtp)}
                >
                  {showOtp ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={verifyOtp}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>
            </div>
          </>
        ) : (
          !newPasswordUI && (
            <div className="text-center mt-6">
              <button
                onClick={handleChangePassword}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Password
              </button>
            </div>
          )
        )}
      </div>

      {newPasswordUI && (
        <div className="mt-6">
          <>
            {/* New Password Input */}
            <div className="flex flex-col items-center gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Enter New Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={updatePassword}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};
