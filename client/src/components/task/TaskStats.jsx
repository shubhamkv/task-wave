import { CheckCircle, Clock, ListTodo, XCircle } from "lucide-react";
import { useTaskContext } from "../../context/TaskContext";
import { useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

const statStyles = {
  total: "bg-blue-500",
  completed: "bg-green-500",
  pending: "bg-yellow-400",
  missed: "bg-red-500",
};

export const TaskStats = () => {
  const { stats, setStats, tasks } = useTaskContext();

  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/tasks/stats");
      setStats(res.data);
      //console.log(stats);
    } catch (e) {
      console.log("Error in fetching stats:", e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pl-4">
      <StatCard
        label="Total Tasks"
        value={stats.total}
        color={statStyles.total}
        Icon={ListTodo}
      />
      <StatCard
        label="Completed"
        value={stats.completed}
        color={statStyles.completed}
        Icon={CheckCircle}
      />
      <StatCard
        label="Pending"
        value={stats.pending}
        color={statStyles.pending}
        Icon={Clock}
      />
      <StatCard
        label="Missed"
        value={stats.missed}
        color={statStyles.missed}
        Icon={XCircle}
      />
    </div>
  );
};

const StatCard = ({ label, value, color, Icon }) => (
  <div
    className={`rounded-2xl shadow-lg p-4 flex items-center gap-4 text-white ${color}`}
  >
    <Icon className="w-8 h-8" />
    <div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  </div>
);
