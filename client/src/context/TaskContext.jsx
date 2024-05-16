import { createContext, useState, useEffect } from "react";
import { getTasksRequest, saveTaskRequest } from "../api/tasks";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTask = (task) => {
    try {
      setTasks([...tasks, task]);
      saveTaskRequest(task);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, saveTask, isLoading }}>
      {children}
    </TaskContext.Provider>
  );
}