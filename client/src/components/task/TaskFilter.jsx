import { useTaskContext } from "../../context/TaskContext";

export const TaskFilter = () => {
  const { filters, setFilters } = useTaskContext();
  const handleChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl shadow p-4 mb-6 ml-4">
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Filter Tasks
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          >
            <option value="" className="dark:text-gray-900">
              All
            </option>
            <option value="completed" className="dark:text-gray-900">
              Completed
            </option>
            <option value="pending" className="dark:text-gray-900">
              Pending
            </option>
            <option value="missed" className="dark:text-gray-900">
              Missed
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
            Priority
          </label>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          >
            <option value="" className="dark:text-gray-900">
              All
            </option>
            <option value="high" className="dark:text-gray-900">
              High
            </option>
            <option value="medium" className="dark:text-gray-900">
              Medium
            </option>
            <option value="low" className="dark:text-gray-900">
              Low
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
            Created At
          </label>
          <input
            type="date"
            name="createdAt"
            value={filters.createdAt}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={filters.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};
