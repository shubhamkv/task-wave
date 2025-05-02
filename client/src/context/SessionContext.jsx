import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInstance";

const SessionContext = createContext();

const toDateString = (utcDate) => {
  const date = new Date(utcDate);
  const localDate = new Date(
    date.getTime() + new Date().getTimezoneOffset() * -60000
  );
  return localDate.toISOString().split("T")[0]; // yyyy-mm-dd
};

export const SessionProvider = ({ children }) => {
  const [taskName, setTaskName] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() =>
    toDateString(new Date())
  );
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get("/focus-session");
      const allSessions = res.data;

      const filtered = allSessions.filter((session) => {
        const localDateStr = toDateString(session.createdAt);
        return localDateStr === selectedDate;
      });

      setSessions(filtered);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch session history");
    } finally {
      setLoading(false);
    }
  };

  //console.log(selectedTaskId);
  return (
    <SessionContext.Provider
      value={{
        taskName,
        setTaskName,
        selectedTaskId,
        setSelectedTaskId,
        sessions,
        setSessions,
        selectedDate,
        setSelectedDate,
        loading,
        setLoading,
        fetchSessions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
