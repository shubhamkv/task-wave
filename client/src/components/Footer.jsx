import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <div className="sticky top-0 z-50 flex justify-around items-center px-6 py-4 bg-gradient-to-r from-indigo-400 to-purple-500 dark:from-gray-900 dark:via-gray-950 dark:to-black shadow-lg">
      <div className="font-medium dark:text-gray-500 text-gray-800">
        Made with ❤️ by Shubham Kumar
      </div>

      <div className="hidden md:flex space-x-6 dark:text-gray-500 text-gray-800 font-medium">
        <h2>Copyright © {year} TaskWave</h2>
      </div>

      <div className="flex items-center space-x-4">
        <NavLink
          to="/dashboard"
          className="dark:text-gray-500 text-gray-800 hover:text-blue-200 transition text-xl"
          title="Dashboard"
        >
          <MdDashboard />
        </NavLink>
        <NavLink
          to="https://github.com/shubhamkv/task-wave"
          className="text-white hover:text-blue-200 transition text-xl"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <FaGithub />
        </NavLink>
      </div>
    </div>
  );
};
