import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TasksPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import NavBar from "./components/NavBar";

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
			<NavBar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route element={<ProtectedRoute />}>
						<Route path="/tasks" element={<TasksPage />} />
						<Route path="/add-task" element={<TaskFormPage />} />
						<Route path="/tasks/:id" element={<TaskFormPage />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
