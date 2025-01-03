import { useEffect } from "react";
import Button from "../components/Button";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signup, user, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		await signup(data);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/tasks");
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="grid items-center sm:justify-center min-h-screen">
			<div className="bg-[#242424] w-100 sm:w-[375px] p-10 rounded-2xl h-max">
				<form onSubmit={handleSubmit(onSubmit)} className="grid" noValidate>
					<CustomInput
						id="registerUsername"
						type="text"
						label="Username"
						register={{ ...register("username", { required: true }) }}
					/>
					{errors.username && (
						<ErrorMessage message={"Username is required."} />
					)}
					<CustomInput
						id="registerEmail"
						type="email"
						label="Email"
						register={{ ...register("email", { required: true }) }}
					/>
					{errors.email && <ErrorMessage message={"Email is required."} />}
					<CustomInput
						id="registerPassword"
						type="password"
						label="Password"
						register={{ ...register("password", { required: true }) }}
					/>
					{errors.password && (
						<ErrorMessage message={"Password is required."} />
					)}
					{user?.error && <ErrorMessage message={user.error} />}
					<Button text="register" type="submit" />
				</form>
				<p className="mt-3 text-sm">Already have an account? <Link className="text-sky-500" to="/login">Sign in</Link></p>
			</div>
		</div>
	);
}
