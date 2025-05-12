import heroSectionImage from "../assets/hero-section.jpg";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 dark:from-gray-900 dark:via-gray-950 dark:to-black dark:text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Manage Your Daily Tasks Effortlessly
          </h1>
          <p className="text-base sm:text-lg md:text-xl">
            All-in-one platform to schedule, analyze and improve your
            productivity.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition text-white cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={heroSectionImage}
            alt="Productivity illustration"
            className="rounded-lg shadow-xl w-72 sm:w-80 md:w-full max-w-md transition-transform hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  );
};
