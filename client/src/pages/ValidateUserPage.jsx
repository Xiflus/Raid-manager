import { useContext, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { activateUserService } from "../../services/userService";
import { showToast } from "../utils/toast";

const ValidateUserPage = () => {
  const navigate = useNavigate();

  const { authUser } = useContext(AuthContext);

  const { registrationCode } = useParams();

  useEffect(() => {
    const fetchValidateUser = async () => {
      try {
        await activateUserService(registrationCode);

        showToast(
          "¡Usuario activado correctamente! Logueate para continuar.",
          "success"
        );

        navigate("/login");
      } catch (error) {
        showToast("¡Codigo de activación incorrecto!", "error");

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
