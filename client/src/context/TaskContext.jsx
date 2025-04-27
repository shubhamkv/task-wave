import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    missed: 0,
  });
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    createdAt: "",
    dueDate: "",
  });

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const fetchTasks = async (filters = {}) => {
    try {
      const res = await axiosInstance.get("/tasks", { params: filters });
      console.log(res.data);
      setTasks(res.data.tasks);
    } catch (e) {
      console.log("Error in fetching tasks", e);
    }
  };

  useEffect(() => {
    fetchTasks(filters);
  }, [filters]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        fetchTasks,
        editTask,
        setEditTask,
        stats,
        setStats,
        filters,
        setFilters,
        handleEditTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
