import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useTaskContext } from "../../context/TaskContext";

export const AddTask = () => {
  const { editTask, setEditTask, fetchTasks } = useTaskContext();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const isEditing = Boolean(editTask);

  useEffect(() => {
    if (isEditing && editTask) {
      setForm({
        title: editTask.title || "",
        description: editTask.description || "",
        priority: editTask.priority || "",
        dueDate: editTask.dueDate?.slice(0, 10) || "",
      });
      setShowForm(true);
    }
  }, [editTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axiosInstance.put(`/tasks/${editTask._id}`, form);
        toast.success("Task updated successfully!!");
        setEditTask(null);
      } else {
        await axiosInstance.post("/tasks", form);
        toast.success("Task added successfully!");
      }

      setForm({ title: "", description: "", priority: "", dueDate: "" });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add task");
    }
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-800 shadow p-4 rounded-2xl mb-6 ml-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          {isEditing ? "Update Task" : "Add New Task"}
        </h3>
        {!isEditing && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-1 h-12 cursor-pointer rounded-xl hover:bg-indigo-700 transition"
          >
            {/* {console.log(showForm)} */}
            {showForm ? "Hide" : "Add Task"}
          </button>
        )}
      </div>

      {(showForm || isEditing) && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2 dark:text-white"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="" className="dark:text-gray-900">
                Select
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write something about this task..."
              required
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
