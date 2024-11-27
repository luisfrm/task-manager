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
			<main className="mx-auto w-full max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
		</TaskProvider>
	);
}
