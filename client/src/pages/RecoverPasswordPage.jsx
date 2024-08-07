import { useRef } from "react";
import { showToast } from "../utils/toast.jsx";
import { Link } from "react-router-dom";
import { recoverPasswordService } from "../../services/userService.js";

const RecoverPasswordPage = () => {
	const emailRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = emailRef.current.value;

		try {
			await recoverPasswordService({ email });
			showToast("Se ha enviado un enlace de recuperación a su correo electrónico.", "success");
			emailRef.current.value = "";
		} catch (err) {
			showToast(err.message, "error");
		}
	};

	return (
		<main className="bg-black flex flex-col items-center justify-center min-h-screen">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<input
							type="email"
							id="email"
							ref={emailRef}
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
							placeholder="Correo Electrónico"
							required
						/>
						<label
							htmlFor="email"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						></label>
					</div>
					<div>
						<button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
							Recuperar Contraseña
						</button>
					</div>
				</form>
				<div className="text-center mt-6">
					<Link to="/login" className="text-orange-500 hover:underline hover:text-orange-700">
						¿Ya tienes una cuenta? Inicia sesión
					</Link>
					<div className="mt-4">
						<Link to="/" className="inline-block text-orange-500 hover:underline hover:text-orange-700">
							Volver al inicio
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default RecoverPasswordPage;
