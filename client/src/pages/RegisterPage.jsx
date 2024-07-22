import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
	const { authUser, authRegister } = useContext(AuthContext);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPass, setRepeatedPass] = useState('');

	const handleRegister = (e) => {
		e.preventDefault();
		try {
			if (password !== repeatedPass) {
				throw new Error('Las contraseñas no coinciden');
			}
			authRegister(username, email, password);
		} catch (err) {
			toast.error(err.message);
		}
	};

	if (authUser) return <Navigate to="/" />;

	return (
		<main className="bg-black min-h-screen flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-white text-2xl font-bold mb-6">Página de registro</h2>
				<form onSubmit={handleRegister} className="space-y-6">
					<div className="relative">
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
							placeholder="Usuario"
							required
						/>
						<label
							htmlFor="username"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						>
						</label>
					</div>
					<div className="relative">
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
							placeholder="Email"
							required
						/>
						<label
							htmlFor="email"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						>
						</label>
					</div>
					<div className="relative">
						<input
							type="password"
							id="pass"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
							placeholder="Contraseña"
							required
						/>
						<label
							htmlFor="pass"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						>
						</label>
					</div>
					<div className="relative">
						<input
							type="password"
							id="repeatedPass"
							value={repeatedPass}
							onChange={(e) => setRepeatedPass(e.target.value)}
							className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
							placeholder="Repetir contraseña"
							required
						/>
						<label
							htmlFor="repeatedPass"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						>
						</label>
					</div>
					<div>
						<button
							type="submit"
							className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
						>
							Registrarse
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default RegisterPage;
