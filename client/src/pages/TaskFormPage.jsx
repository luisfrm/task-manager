import Button from "../components/Button";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useTask } from "../context/useTask";
import FormGroup from "../components/FormGroup";

export default function TaskFormPage() {
	const { register, handleSubmit, reset } = useForm();
	const { saveTask } = useTask();

	const onSubmit = handleSubmit(data => {
		saveTask(data);
		reset();
	});

	return (
		<div className="bg-[#242424] border-[#3A3A3A] max-w-md w-full p-10 rounded-md justify-self-center">
			<form className="grid gap-4" action="" onSubmit={onSubmit}>
				<FormGroup>
					<label htmlFor="titleTask" className="text-sm font-medium text-neutral-200">
						Title
					</label>
					<CustomInput
						id="titleTask"
						type="text"
						label="Type the task title"
						register={{ ...register("title", { required: true }) }}
					/>
				</FormGroup>
				<FormGroup>
					<label htmlFor="descriptionTask" className="text-sm font-medium">
						Description
					</label>
					<textarea
						rows="6"
						className="w-full rounded border border-solid border-secondary-500 bg-transparent px-3 py-4 text-white placeholder:text-neutral-400"
						placeholder="Type something"
						{...register("description", { required: true })}
					></textarea>
					
				</FormGroup>
				<Button text="Save" type="submit" />
			</form>
		</div>
	);
}
