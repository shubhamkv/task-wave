import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaStopwatch,
  FaUser,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useAuthContext } from "../context/AuthContext";

export const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/signin");
  };

  const linkClass =
    "flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition";

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-gray-800 text-white flex flex-col justify-between fixed`}
    >
      <div>
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <NavLink
              to="/"
              className="text-2xl font-bold text-center text-indigo-500"
            >
              TaskWave
            </NavLink>
          )}
          <button onClick={toggleSidebar}>
            <FaBars className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          <NavLink
            to="/dashboard/tasks"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-gray-700" : ""}`
            }
          >
            <FaTasks />
            {!collapsed && <span>Tasks</span>}
          </NavLink>
          <NavLink
            to="/dashboard/focus-session"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-gray-700" : ""}`
            }
          >
            <FaStopwatch />
            {!collapsed && <span>Focus Session</span>}
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-gray-700" : ""}`
            }
          >
            <FaUser />
            {!collapsed && <span>Profile</span>}
          </NavLink>
        </nav>
      </div>

      <div className="p-4 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
          {!collapsed && <span>Toggle Theme</span>}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2 rounded"
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};
