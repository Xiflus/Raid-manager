import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showToast } from "../utils/toast.jsx";
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const { authUser, authRegister } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPass, setRepeatedPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPass, setShowRepeatedPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      if (password !== repeatedPass) {
        throw new Error("Las contraseñas no coinciden");
      }
      authRegister(username, email, password);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  if (authUser) return <Navigate to="/" />;

  return (
    <main className="bg-black flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Página de registro
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
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
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
            ></label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
              placeholder="Contraseña"
              required
            />
            <label
              htmlFor="pass"
              className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
            ></label>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
            />
          </div>
          <div className="relative">
            <input
              type={showRepeatedPass ? "text" : "password"}
              id="repeatedPass"
              value={repeatedPass}
              onChange={(e) => setRepeatedPass(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
              placeholder="Repetir contraseña"
              required
            />
            <label
              htmlFor="repeatedPass"
              className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
            ></label>
            <FontAwesomeIcon
              icon={showRepeatedPass ? faEyeSlash : faEye}
              onClick={() => setShowRepeatedPass(!showRepeatedPass)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Registrarse
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

export default RegisterPage;
