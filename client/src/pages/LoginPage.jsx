import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
// import ToggleTheme from "../components/ThemeComponent";

const LoginPage = () => {
	const { authLogin, authUser } = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();
		authLogin(username, password);
	};
	if (authUser) return <Navigate to="/"></Navigate>;
	return (
		<main className="">
			<div className="">
				<div className="">
					<form onSubmit={handleLogin}>
						<h1 className="">Tus credenciales</h1>
						<div className="">
							<input type="text" className="" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
							<label htmlFor="username">Usuario</label>
						</div>
						<div className="">
							<input type="password" className="" id="password" onChange={(e) => setPassword(e.target.value)} />
							<label htmlFor="password">Contraseña</label>
						</div>
						<div className="">
							<button className="" type="submit">
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
