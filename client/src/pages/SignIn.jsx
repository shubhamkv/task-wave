import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { SidePanel } from "../components/SidePanel";

export const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setToken } = useAuthContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.post("/user/signin", form);

      setSuccess(res.data.msg);
      localStorage.setItem("token", res.data.token);
      //console.log(res.data);
      setToken(res.data.token);
      setForm({ username: "", password: "" });

      setTimeout(() => navigate("/dashboard", { replace: true }), 500);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed! Try again.");
      setForm({ username: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-300">
      <SidePanel />

      <div className="flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Welcome Back
          </h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-600 mb-4 text-center">{success}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
            >
              Sign In
            </button>
          </form>
          <p className="mt-5 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
