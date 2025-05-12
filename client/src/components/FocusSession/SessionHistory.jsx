import { useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSessionContext } from "../../context/SessionContext";

const convertToLocalTime = (utcTime) => {
  const date = new Date(utcTime);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const localTime = date.toLocaleTimeString(undefined, options);
  const [time, ampm] = localTime.split(" ");
  const [hours, minutes] = time.split(":");
  return { hours, minutes, ampm };
};

export const SessionHistory = () => {
  const { sessions, loading, selectedDate, setSelectedDate, fetchSessions } =
    useSessionContext();

  useEffect(() => {
    fetchSessions();
  }, [selectedDate]);

  const deleteSession = async (sessionId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/focus-session/${sessionId}`);

      toast.success("Session deleted");
      fetchSessions();
    } catch (err) {
      toast.error("Failed to delete session");
    }
  };

  if (loading) return <p className="text-center">Loading session history...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Session History
      </h2>

      <div className="mb-6 flex justify-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      {sessions.length === 0 ? (
        <p className="pt-5 font-medium text-center dark:text-white">
          No focus sessions today...
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {sessions.map((session) => {
            const startLocal = convertToLocalTime(session.startedAt);
            const endLocal = convertToLocalTime(session.endedAt);

            return (
              <div
                key={session._id}
                className="p-4 bg-card dark:bg-slate-800 shadow-md rounded-xl text-card-foreground flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 dark:text-slate-300">
                    Task:
                  </span>
                  <span className="font-medium dark:text-white">
                    {session.taskName}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Duration:
                  </span>
                  <span className="dark:text-white">
                    {session.duration} min
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Start:
                  </span>
                  <span className="dark:text-white">
                    {startLocal.hours}:{startLocal.minutes} {startLocal.ampm}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    End:
                  </span>
                  <span className="dark:text-white">
                    {endLocal.hours}:{endLocal.minutes} {endLocal.ampm}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    session.status === "Success"
                      ? "bg-green-500 text-green-900"
                      : "bg-yellow-500 text-yellow-900"
                  }`}
                >
                  {session.status}
                </span>

                <button
                  onClick={() => deleteSession(session._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
