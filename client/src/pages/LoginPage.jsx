import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
	const { authLogin, authUser } = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		authLogin(username, password);
	};

	if (authUser) return <Navigate to="/" />;

	return (
		<main className="bg-black min-h-screen flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<form onSubmit={handleLogin} className="space-y-6">
					<h1 className="text-white text-2xl font-bold">Tus credenciales</h1>
					<div className="relative">
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
							placeholder="Usuario"
						/>
						<label
							htmlFor="username"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						>
						
						</label>
					</div>
					<div className="relative">
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
							placeholder="Contraseña"
						/>
						<label
							htmlFor="password"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						>
						
						</label>
					</div>
					<div>
						<button
							type="submit"
							className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
						>
							Entrar
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default LoginPage;
