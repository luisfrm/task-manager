import { useEffect } from "react";
import Button from "../components/Button";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { login, user, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		await login(data);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/tasks");
		}
	}, [isAuthenticated, navigate]);

  return (
    <div className="grid items-center sm:justify-center min-h-dvh">
			<div className="bg-[#242424] w-100 sm:w-[375px] p-10 rounded-2xl h-max">
				<form onSubmit={handleSubmit(onSubmit)} className="grid">
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
					<Button text="Login" type="submit" />
				</form>
        <p className="mt-3 text-md md:text-sm">Don&apos;t have an account? <Link className="text-sky-500" to="/register">Sign up</Link></p>
			</div>
		</div>
  )
}
