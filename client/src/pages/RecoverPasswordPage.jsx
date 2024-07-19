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
		<main className="">
			<h2>Recuperar Contraseña</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Correo Electrónico:</label>
				<input type="email" id="email" ref={emailRef} required />

				<div>
					<button type="submit">Recuperar Contraseña</button>
				</div>
			</form>
		</main>
	);
};

export default RecoverPasswordPage;
