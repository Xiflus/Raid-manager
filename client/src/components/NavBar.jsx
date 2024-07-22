import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
	const { authLogout, authUser } = useContext(AuthContext);
	return (
		<nav className="flex-1">
			<ul className="flex justify-around items-center p-4 space-x-4">
				{!authUser ? (
					<>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/register"
							>
								Registrarse
							</Link>
						</li>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/login"
							>
								Iniciar sesión
							</Link>
						</li>
						
					</>
				) : (
					<>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/users/profile"
							>
								Mi perfil
							</Link>
						</li>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/entries/NewEntry"
							>
								Nueva entrada
							</Link>
						</li>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/guild/create"
							>
								Creación de hermandad
							</Link>
						</li>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/guild/:guildId/edit"
							>
								Editar hermandad
							</Link>
						</li>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/characters/create"
							>
								Crear personaje
							</Link>
						</li>
						<li className="flex-1">
							<Link
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg"
								to="/posts/create"
							>
								Crear post
							</Link>
						</li>
						<li className="flex-1">
							<button
								className="text-white font-bold hover:text-purple-500 block px-4 py-2 rounded-lg focus:outline-none"
								onClick={authLogout}
							>
								Cerrar sesión
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;