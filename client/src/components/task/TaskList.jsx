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

  if (loading)
    return <p className="text-center text-gray-500">Loading tasks...</p>;

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

    if (task.completed) return "bg-green-100 border-green-400";
    else if (todayDateOnly <= dueDateOnly)
      return "bg-yellow-100 border-yellow-400";
    else return "bg-red-100 border-red-400";
  };

  return (
    <div className="mt-6 space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`border-l-4 p-4 rounded-xl shadow ${getStatusColor(task)}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-start">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task._id, task.completed)}
                className="mt-1"
              />
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-700">{task.description}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-sm font-medium capitalize text-gray-600">
                {task.priority}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.completed ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm mt-3 text-gray-600">
            <span>
              Created: {format(new Date(task.createdAt), "yyyy-MM-dd")}
            </span>
            <span>Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}</span>
          </div>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => handleEditTask(task)}
              className="text-blue-600 hover:text-blue-800"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-600 hover:text-red-800"
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
