import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavBar() {

  const {isAuthenticated, logout} = useAuth();

  console.log(isAuthenticated)

  return (
		<nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10">
			<Link to="/">
				<h1 className="text-2xl font-bold">Task Manager</h1>
			</Link>
			<ul className="flex gap-x-2">
				{isAuthenticated && (
          <>
					<li>
						<Link to="/tasks">Tasks</Link>
					</li>
          <li className="cursor-pointer" onClick={logout}>
            Logout
          </li>
          </>
				)}

				{!isAuthenticated && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
