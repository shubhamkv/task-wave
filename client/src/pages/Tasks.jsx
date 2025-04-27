import Header from "../components/task/Header";
import { TaskStats } from "../components/task/TaskStats";
import { AddTask } from "../components/task/AddTask";
import { TaskFilter } from "../components/task/TaskFilter";
import { TaskList } from "../components/task/TaskList";

export const Tasks = () => {
  return (
    <div>
      <Header />
      <TaskStats />
      <AddTask />
      <TaskFilter />
      <TaskList />
    </div>
  );
};
