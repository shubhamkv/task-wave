import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSessionContext } from "../../context/SessionContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export const Timer = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 25 * 60000)
  );
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { taskName, selectedTaskId } = useSessionContext();

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartChange = (e) => {
    const value = new Date(e.target.value);
    setStartTime(value);
    const newEnd = new Date(value.getTime() + 25 * 60000);
    setEndTime(newEnd);
  };

  const handleEndChange = (e) => {
    const value = new Date(e.target.value);
    setEndTime(value);
    const seconds = Math.floor((value - startTime) / 1000);
    setTimeLeft(seconds > 0 ? seconds : 0);
  };

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const sec = (secs % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleStart = async () => {
    if (timeLeft > 0) {
      const duration = Math.floor((endTime - startTime) / (1000 * 60));

      // console.log(startTime);
      // console.log(endTime);
      // console.log(duration);
      // console.log(taskName);
      // console.log(selectedTaskId);

      try {
        await axiosInstance.post("/focus-session", {
          taskName,
          taskId: selectedTaskId,
          startedAt: startTime,
          endedAt: endTime,
          duration,
        });
        toast.success("Session created successfully");
        setIsRunning(true);
      } catch (error) {
        console.error("Error message: ", error);
        toast.error("Failed to create session");
      }
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setStartTime(new Date());
    const newEnd = new Date(new Date().getTime() + 25 * 60000);
    setEndTime(newEnd);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 rounded-md shadow-md bg-card text-card-foreground w-full max-w-xl mx-auto">
      {/* Time Selectors */}
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm">Start Time</label>
          <input
            type="datetime-local"
            className="p-2 rounded-md border bg-background text-foreground"
            value={format(startTime, "yyyy-MM-dd'T'HH:mm")}
            onChange={handleStartChange}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm">End Time</label>
          <input
            type="datetime-local"
            className="p-2 rounded-md border bg-background text-foreground"
            value={format(endTime, "yyyy-MM-dd'T'HH:mm")}
            onChange={handleEndChange}
          />
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-6xl font-bold relative flex items-center justify-center w-82 h-82 bg-blue-500 rounded-full shadow-lg tracking-widest">
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
