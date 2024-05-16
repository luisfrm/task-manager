import { createContext, useState, useEffect } from "react";
import {
	loginRequest,
	logoutRequest,
	registerRequest,
	verifyTokenRequest,
} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const signup = async (user) => {
		try {
			const newUser = await registerRequest(user);
			setUser(newUser);

			if (newUser.error) {
				setIsAuthenticated(false);

				setTimeout(() => {
					setUser(null);
				}, 3000);
				return;
			}

			setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
		}
	};

	const login = async (user) => {
		try {
			const newUser = await loginRequest(user);
			setUser(newUser);

			if (newUser.error) {
				setIsAuthenticated(false);

				setTimeout(() => {
					setUser(null);
				}, 3000);
				return;
			}

			setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			const closeSession = await logoutRequest();

			if (closeSession === 200) {
				Cookies.remove("token");
				setIsAuthenticated(false);
				setUser(null);
			}

			return;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const checkToken = async () => {
			const cookies = Cookies.get();
			if (cookies.token) {
				const res = await verifyTokenRequest();
				setIsLoading(false);
				if (res.error) {
					setIsAuthenticated(false);
					return;
				}

				setUser(res);
				setIsAuthenticated(true);
			}
			setIsLoading(false);
		};

		checkToken();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, signup, isAuthenticated, login, isLoading, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
