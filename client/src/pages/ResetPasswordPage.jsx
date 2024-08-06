import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showToast } from "../utils/toast.jsx";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPasswordPage = () => {
	const { authResetPassword } = useContext(AuthContext);
	const { recoverPassCode } = useParams();
	const [newPassword, setNewPassword] = useState("");
	const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showRepeatedNewPassword, setShowRepeatedNewPassword] = useState(false);

	const handleResetPassword = async (e) => {
		e.preventDefault();
		if (newPassword !== repeatedNewPassword) {
			showToast("Las contraseñas no coinciden", "error");
			return;
		}
		try {
			await authResetPassword(recoverPassCode, newPassword);
		} catch (err) {
			showToast(err.message, "error");
		}
	};

	return (
		<main className="bg-black flex flex-col items-center justify-center flex-1 p-4">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Cambiar contraseña</h2>
				<form onSubmit={handleResetPassword} className="space-y-6">
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
						<label
							htmlFor="newPassword"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						></label>
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
						<label
							htmlFor="repeatedNewPassword"
							className="absolute top-0 left-0 px-3 py-2 text-gray-500 transition-transform transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
						></label>
						<FontAwesomeIcon
							icon={showRepeatedNewPassword ? faEyeSlash : faEye}
							onClick={() => setShowRepeatedNewPassword(!showRepeatedNewPassword)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
						/>
					</div>
					<div>
						<button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
							Cambiar contraseña
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default ResetPasswordPage;
