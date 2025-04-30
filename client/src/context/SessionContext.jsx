import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [taskName, setTaskName] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");

  //console.log(selectedTaskId);
  return (
    <SessionContext.Provider
      value={{ taskName, setTaskName, selectedTaskId, setSelectedTaskId }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
