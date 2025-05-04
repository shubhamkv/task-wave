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
  const { taskName, selectedTaskId, fetchSessions } = useSessionContext();
  const [startButton, setStartButton] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(25 * 60);
  const [focusStreak, setFocusStreak] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [currentSesssionId, setCurrentSessionId] = useState("");

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            setIsRunning(false);
            setProgress(100);
            return 0;
          }
          const updated = prev - 1;
          setProgress(((duration - updated) / duration) * 100);
          return updated;
        });
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    const updateFocusStreak = async () => {
      if (focusStreak && Math.floor(progress) === 100) {
        try {
          const count = streakCount + 1;
          await axiosInstance.put("/user/profile", {
            focusStreak: count,
          });
          await axiosInstance.put(`/focus-session/${currentSesssionId}`, {
            status: "Success",
          });
          toast.success("Congrats! You have maintain the focus");
          setStreakCount(count);
          fetchSessions(); // api call to fetch session history
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.msg || "Failed to update streak");
        }
        setFocusStreak(false);
        setStartButton(true);
      }
    };
    updateFocusStreak();
  }, [focusStreak, progress]);

  useEffect(() => {
    const getStreakCount = async () => {
      try {
        const res = await axiosInstance.get("/user/profile");
        setStreakCount(res.data.focusStreak);
      } catch (error) {
        console.log("Error in fetching streak count", error);
      }
    };
    getStreakCount();
  }, [streakCount]);

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
      const actualStartTime = new Date();
      const actualEndTime = new Date(
        actualStartTime.getTime() + timeLeft * 1000
      );
      const durationInSeconds = Math.floor(
        (actualEndTime - actualStartTime) / 1000
      );

      // console.log(actualStartTime);
      // console.log(actualEndTime);
      // console.log(Math.floor(durationInSeconds / 60));
      // console.log(taskName);
      // console.log(selectedTaskId);

      try {
        const res = await axiosInstance.post("/focus-session", {
          taskName,
          taskId: selectedTaskId,
          startedAt: actualStartTime,
          endedAt: actualEndTime,
          duration: Math.floor(durationInSeconds / 60),
        });
        toast.success("Session created successfully");
        //console.log(res.data.createdSession._id);
        setCurrentSessionId(res.data.createdSession._id);
        setStartTime(actualStartTime);
        setEndTime(actualEndTime);
        setDuration(durationInSeconds);
        setIsRunning(true);
        setStartButton(false);
        setFocusStreak(true);
      } catch (error) {
        console.error("Error message: ", error);
        toast.error(error.response?.data?.msg || "Failed to create session");
        setIsRunning(false);
      }
    } else {
      toast.error("Invalid session duration");
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    if (focusStreak) {
      fetchSessions();
      toast.error("Oops! you are failed to stay focus");
    }
    setFocusStreak(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setStartTime(new Date());
    const newEnd = new Date(new Date().getTime() + 25 * 60000);
    setEndTime(newEnd);
    setTimeLeft(25 * 60);
    setStartButton(true);
    setProgress(0);
    if (focusStreak) {
      fetchSessions();
      toast.error("Oops! you are failed to stay focus");
    }
    setFocusStreak(false);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-4 rounded-md shadow-md bg-card text-card-foreground w-full max-w-xl mx-auto">
        {/* Time Selectors */}
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col w-1/2">
            <label className="mb-1 text-sm">Start Time</label>
            <input
              type="datetime-local"
              className="p-2 rounded-md border bg-background text-foreground"
              value={format(startTime, "yyyy-MM-dd'T'HH:mm")}
              readOnly
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
          {startButton ? (
            <button
              onClick={handleStart}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              Pause
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 w-full">
          {/* Progress Bar */}
          <div className="w-[400px] bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Percentage */}
          <div className="ml-2 text-gray-700 dark:text-gray-300 font-semibold">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Focus Streak Section */}
        <div className="mt-6 w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center justify-between text-gray-700 dark:text-gray-100">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Focus Streak
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              🔥 {streakCount} session{streakCount > 1 ? "s" : ""}
            </span>
          </div>
          {focusStreak ? (
            <span className="text-green-600 font-medium">Active</span>
          ) : (
            <span className="text-red-500 font-medium">Inactive</span>
          )}
        </div>
      </div>
    </>
  );
};
