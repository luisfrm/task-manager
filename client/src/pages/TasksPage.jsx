// import { useAuth } from "../context/useAuth";
import { useTask } from "../context/useTask";
import TaskFormPage from "./TaskFormPage";
import Button from "../components/Button";

export default function TasksPage() {
	const { tasks } = useTask();

	return (
		<div className="grid my-20 gap-4">
			<TaskFormPage />
			<div className="grid gap-4 grid-template-columns-1 md:grid-cols-2 lg:grid-cols-3">
				{tasks.map((task, index) => (
					<div
						key={index}
						className="flex flex-col justify-between bg-[#242424] max-w-md p-10 rounded-md border border-[#3A3A3A] hover:scale-105 hover:border-white transition-all duration-200 ease-linear"
					>
						<div>
							<h1 className="text-2xl font-bold text-white">{task.title}</h1>
							<p className="text-neutral-300">{task.description}</p>
						</div>
						<div className="flex justify-end gap-2 mt-4">
							<Button text="Edit" type="button" />
							<Button text="Delete" type="button" className="bg-red-500 hover:bg-red-600" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
