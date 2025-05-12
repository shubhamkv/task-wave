import { Link } from "react-router-dom";
import sidePanelImage from "../assets/register.svg";

export const SidePanel = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-400 text-white flex flex-col items-center justify-between p-8">
      <div className="text-center px-4">
        <h1 className="text-4xl text-indigo-600 md:text-5xl font-extrabold mb-3">
          TaskWave
        </h1>
        <p className="text-lg text-gray-700 md:text-xl font-medium max-w-md leading-relaxed py-4">
          "Small consistent actions lead to massive results. Stay focused and
          ride the wave of productivity."
        </p>
      </div>
      <img
        src={sidePanelImage}
        alt="Motivation"
        className="rounded-xl shadow-lg w-3/4 max-w-sm mb-6"
      />
      <p className="text-medium text-center text-gray-800">
        Want to return to the Home Page?{" "}
        <Link
          to="/"
          className="text-blue-800 font-semibold hover:underline transition duration-150"
        >
          Click here
        </Link>
      </p>
    </div>
  );
};
