import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const { authLogin, authUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    authLogin(username, password)
      .then(() => {
        toast.success("Inicio de sesión exitoso");
      })
      .catch((error) => {
        toast.error("Error al iniciar sesión: " + error.message);
      });
  };

  if (authUser) return <Navigate to="/" />;

  return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-6">
          <h1 className="text-white text-2xl font-bold text-center">Tus credenciales</h1>
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
            ></label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-green-500 rounded-lg placeholder focus:outline-none"
              placeholder="Contraseña"
              required
            />
            <label
              htmlFor="password"
              className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
            ></label>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
            >
              Entrar
            </button>
          </div>
          <div className="text-center">
            <Link to="/recover-password" className="text-green-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
            <span className="text-gray-400 mx-2">|</span>
            <Link to="/register" className="text-green-500 hover:underline">
              Crear una cuenta
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
