import Button from "../components/Button";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useTask } from "../context/useTask";

export default function TaskFormPage() {
	const { register, handleSubmit } = useForm();
	const { saveTask } = useTask();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		saveTask(data);
	});

	return (
		<div className="bg-zinc-800 max-w-md w-full p-10 rounded-md justify-self-center">
			<form className="grid gap-4" action="" onSubmit={onSubmit}>
				<CustomInput
					id="titleTask"
					type="text"
					label="Title"
					register={{ ...register("title", { required: true }) }}
				/>
				<textarea
					rows="3"
          className="peer m-0 block w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight dark:text-white text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:autofill:shadow-autofill dark:focus:border-primary dark:focus:text-white dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
					placeholder="Description"
					{...register("description", { required: true })}
				></textarea>
				<Button text="Save" type="submit" />
			</form>
		</div>
	);
}
