import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavBar() {

  const {isAuthenticated, logout} = useAuth();

  return (
		<nav className="bg-[#1A1A1D] flex justify-between py-5 px-10 fixed top-0 left-0 right-0 z-50">
			<Link to="/">
				<h1 className="text-2xl font-bold hover:scale-105 transition-all duration-100 ease-linear">Task Manager</h1>
			</Link>
			<ul className="flex">
				{isAuthenticated && (
					<>
						<li>
							<Link className="border-b-2 border-transparent hover:border-b-white py-2 px-3 font-semibold" to="/tasks">
								Tasks
							</Link>
						</li>
						<li>
							<Link className="cursor-pointer border-b-2 border-transparent hover:border-b-white py-2 px-3 font-semibold" to="#" onClick={logout}>
								Logout
							</Link>
						</li>
					</>
				)}

				{!isAuthenticated && (
					<>
						<li>
							<Link className="border-b-2 border-transparent hover:border-b-white py-2 px-3 font-semibold" to="/login">
								Login
							</Link>
						</li>
						<li>
							<Link
								className="border-b-2 border-transparent hover:border-b-white py-2 px-3 font-semibold"
								to="/register"
							>
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
