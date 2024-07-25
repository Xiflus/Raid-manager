//hooks
import { useContext, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

//context
import { AuthContext } from "../context/AuthContext";

//toast
import { toast } from "react-hot-toast";

import { activateUserService } from "../../services/userService";

const ValidateUserPage = () => {
	const navigate = useNavigate();

	const { authUser } = useContext(AuthContext);

	const { registrationCode } = useParams();

	useEffect(() => {
		const fetchValidateUser = async () => {
			try {
				await activateUserService(registrationCode);

				toast.success("¡Usuario activado correctamente! Logueate para continuar.");

				navigate("/login");
			} catch (error) {
				toast.error("¡Codigo de activación incorrecto!");

				navigate("/register");
			}
		};

		if (!authUser) {
			fetchValidateUser();
		}
	}, [registrationCode, authUser, navigate]);

	if (authUser) {
		return <Navigate to="/" />;
	}

	return (
		<main>
			<h2>Página de validación de usuario</h2>
		</main>
	);
};

export default ValidateUserPage;
