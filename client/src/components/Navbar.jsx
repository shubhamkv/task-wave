import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("You are successfully logged out");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-400 to-purple-500 dark:from-gray-900 dark:via-gray-950 dark:to-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-3xl font-bold cursor-pointer text-indigo-700"
          onClick={() => navigate("/")}
        >
          TaskWave
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-slate-800 dark:text-gray-400 font-medium">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-8 text-blue-700"
                : "hover:text-blue-700 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-8 text-blue-700"
                : "hover:text-blue-700 transition"
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-8 text-blue-700"
                : "hover:text-blue-700 transition"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-8 text-blue-700"
                : "hover:text-blue-700 transition"
            }
          >
            API Docs
          </NavLink>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Get Started
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
            >
              Log Out
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-500 text-white px-4 pb-4 space-y-4">
          <NavLink
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-200"
          >
            Features
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-200"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/docs"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-200"
          >
            API Docs
          </NavLink>
          {!token ? (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/signin");
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/signup");
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Get Started
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};
