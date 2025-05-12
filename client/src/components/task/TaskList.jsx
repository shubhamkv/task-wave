import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useTaskContext } from "../../context/TaskContext";

export const TaskList = () => {
  const { tasks, fetchTasks, filters, handleEditTask } = useTaskContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        await fetchTasks(filters);
      } catch (err) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [filters]);

  const toggleCompletion = async (taskId, currentStatus) => {
    try {
      const res = await axiosInstance.put(`/tasks/${taskId}`, {
        completed: !currentStatus,
      });

      toast.success("Task updated");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/tasks/${taskId}`);

      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const isTaskDue = (due) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(due);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading tasks....</p>;

  if (tasks.length === 0)
    return (
      <p className="text-center text-gray-500">
        No tasks found for today. Enjoy your time or add a task!
      </p>
    );

  const getStatusColor = (task) => {
    const due = new Date(task.dueDate);
    const today = new Date();
    const dueDateOnly = new Date(
      due.getFullYear(),
      due.getMonth(),
      due.getDate()
    );
    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (task.completed) return "bg-green-400 border-green-600";
    else if (todayDateOnly <= dueDateOnly)
      return "bg-yellow-400 border-yellow-600";
    else return "bg-red-400 border-red-600";
  };

  return (
    <div className="mt-6 space-y-4 ml-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`border-l-4 p-4 rounded-xl shadow ${getStatusColor(
            task
          )} w-full`}
        >
          {/* Top section */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            {/* Left section: checkbox + title/desc */}
            <div className="flex gap-3 items-start">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task._id, task.completed)}
                className="mt-1"
              />
              <div>
                <h3 className="text-lg font-semibold break-words">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-900 break-words">
                  {task.description}
                </p>
              </div>
            </div>

            {/* Right section: priority + status */}
            <div className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap items-start sm:items-center">
              <span className="text-sm font-medium capitalize text-gray-700">
                {task.priority}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.completed
                    ? "bg-green-500 text-white"
                    : isTaskDue(task.dueDate)
                    ? "bg-red-500 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {task.completed
                  ? "Completed"
                  : isTaskDue(task.dueDate)
                  ? "Missed"
                  : "Pending"}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mt-3 text-gray-800 gap-2">
            <span>
              Created: {format(new Date(task.createdAt), "yyyy-MM-dd")}
            </span>
            <span>Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-2 flex gap-4">
            <button
              onClick={() => handleEditTask(task)}
              className="text-blue-700 hover:text-blue-800 cursor-pointer"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-700 hover:text-red-800 cursor-pointer"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
