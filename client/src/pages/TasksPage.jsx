// import { useAuth } from "../context/useAuth";
import { useTask } from "../context/useTask";
import TaskFormPage from "./TaskFormPage";

export default function TasksPage() {
	const { tasks } = useTask();

	return (
		<div className="w-full grid">
			<TaskFormPage />
			{tasks.map((task, index) => (
				<div
					key={index}
					className="bg-zinc-800 max-w-md w-full p-10 rounded-md justify-self-center"
				>
					<h1 className="text-2xl font-bold text-white">{task.title}</h1>
					<p className="text-neutral-400">{task.description}</p>
				</div>
			))}
		</div>
	);
}
