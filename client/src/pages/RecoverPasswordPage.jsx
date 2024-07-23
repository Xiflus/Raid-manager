import { useRef } from "react";
import toast from "react-hot-toast";
import { recoverPasswordService } from "../../services/userService.js";

const RecoverPasswordPage = () => {
	const emailRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		console.log(email);

		try {
			await recoverPasswordService({ email });
			toast.success("Se ha enviado un enlace de recuperación a su correo electrónico.");
			emailRef.current.value = "";
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<main className="bg-black min-h-screen flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<input
							type="email"
							id="email"
							ref={emailRef}
							className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
							placeholder="Correo Electrónico"
							required
						/>
						<label
							htmlFor="email"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						>
						</label>
					</div>
					<div>
						<button
							type="submit"
							className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
						>
							Recuperar Contraseña
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default RecoverPasswordPage;
