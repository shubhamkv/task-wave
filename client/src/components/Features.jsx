import { FaTasks, FaFilter, FaStopwatch } from "react-icons/fa";

export const Features = () => {
  return (
    <div className="px-6 py-16 ">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Features
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Feature 1 */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-2xl dark:bg-gray-800 transition-transform hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-3">
            <FaTasks className="text-indigo-600 text-2xl" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Task Management
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Create, update, and manage tasks effortlessly with a clean and
            intuitive interface. Stay organized and in control of your daily
            goals at all times.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-2xl transition-transform hover:scale-[1.02] dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <FaFilter className="text-indigo-600 text-2xl" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Smart Filters
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Easily filter tasks by status, priority, or date to streamline your
            workflow. Focus only on what matters, when it matters most.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-2xl transition-transform hover:scale-[1.02] dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <FaStopwatch className="text-indigo-600 text-2xl" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Focus Sessions & Streaks
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Work distraction-free with a built-in timer and task-focused
            sessions. Boost your productivity and build consistency with focus
            streaks.
          </p>
        </div>
      </div>
    </div>
  );
};
