import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export const useTask = () => {
	const context = useContext(TaskContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider.");

	return context;
};