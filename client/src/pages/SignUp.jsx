import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { SidePanel } from "../components/SidePanel";

export const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.post("/user/signup", form);

      setSuccess(res.data.msg);
      setForm({ name: "", username: "", password: "" });

      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
      setForm({
        username: "",
        password: "",
        name: "",
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-300">
      <SidePanel />

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Create Your Account
          </h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-600 mb-4 text-center">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter your name"
              />
            </div>
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
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-sm text-center text-gray-700">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 font-medium hover:underline transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
