import { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useSessionContext } from "../../context/SessionContext";

export const TaskSelector = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const { setTaskName, selectedTaskId, setSelectedTaskId } =
    useSessionContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get(`/tasks`);

        const incompleteTasks = res.data.tasks.filter(
          (task) => !task.completed
        );

        const taskTitles = incompleteTasks.map((task) => ({
          id: task._id,
          title: task.title,
        }));

        setTasks(taskTitles);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, []);

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    setSelectedTaskId(selectedId);
    setNewTaskName("");

    const selectedTask = tasks.find((task) => task.id === selectedId);
    if (selectedTask) {
      setTaskName(selectedTask.title);
    } else {
      setTaskName("");
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setNewTaskName(inputValue);
    setSelectedTaskId("");
    setTaskName(inputValue);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <select
        value={selectedTaskId}
        onChange={handleDropdownChange}
        className="w-75 p-2 rounded-md border bg-background text-foreground"
      >
        <option value="">Select existing task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <div className="text-muted-foreground">OR</div>

      <input
        type="text"
        placeholder="Enter new task name"
        value={newTaskName}
        onChange={handleInputChange}
        className="w-75 p-2 rounded-md border bg-background text-foreground"
      />

      {/* <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition"
      >
        Add Task
      </button> */}
    </div>
  );
};
