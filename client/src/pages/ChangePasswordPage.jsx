import { useState, useContext } from "react";
import { showToast } from "../utils/toast.jsx";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatedNewPassword, setShowRepeatedNewPassword] = useState(false);
  const { authChangePassword } = useContext(AuthContext);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== repeatedNewPassword) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }
    try {
      await authChangePassword(currentPassword, newPassword);
      showToast("Contraseña actualizada, vuelve a loguear", "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <main className="bg-black flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Cambiar contraseña
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
              placeholder="Contraseña actual"
              required
            />
            <FontAwesomeIcon
              icon={showCurrentPassword ? faEyeSlash : faEye}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
            />
          </div>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
              placeholder="Nueva contraseña"
              required
            />
            <FontAwesomeIcon
              icon={showNewPassword ? faEyeSlash : faEye}
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
            />
          </div>
          <div className="relative">
            <input
              type={showRepeatedNewPassword ? "text" : "password"}
              id="repeatedNewPassword"
              value={repeatedNewPassword}
              onChange={(e) => setRepeatedNewPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
              placeholder="Repetir nueva contraseña"
              required
            />
            <FontAwesomeIcon
              icon={showRepeatedNewPassword ? faEyeSlash : faEye}
              onClick={() =>
                setShowRepeatedNewPassword(!showRepeatedNewPassword)
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChangePasswordPage;
