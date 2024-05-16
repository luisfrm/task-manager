import Spinner from "../components/Spinner";
import { TaskProvider } from "../context/TaskContext";
import { useAuth } from "../context/useAuth";
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {

  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Spinner/>
  }

  if (!isAuthenticated && !isLoading) {
    return (
      <Navigate to='/login' replace />
    )
  }

  return (
		<TaskProvider>
			<Outlet />
		</TaskProvider>
	);
}
