import { SessionHistory } from "../components/FocusSession/SessionHistory";
import { TaskSelector } from "../components/FocusSession/TaskSelector";
import { Timer } from "../components/FocusSession/Timer";
import { SessionProvider } from "../context/SessionContext";

export const FocusSession = () => {
  return (
    <SessionProvider>
      <div className="p-4 md:p-8 bg-background text-foreground min-h-screen">
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold dark:text-white">
            Focus Session
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Stay focused, crush your goals!
          </p>
        </div>

        <TaskSelector />

        <div className="my-10">
          <Timer />
        </div>

        <div className="my-10">
          <SessionHistory />
        </div>
      </div>
    </SessionProvider>
  );
};
