import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar collapsed={collapsed} toggleSidebar={handleToggleSidebar} />
      <div
        className={`${
          collapsed ? "pl-20" : "pl-64"
        } p-4 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-300 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-all duration-300 w-full`}
      >
        <Outlet />
      </div>
    </div>
  );
};
