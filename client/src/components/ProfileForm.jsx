import { useRef } from "react";
import { showToast } from "../utils/toast.jsx";
import TextInput from "../components/jsxComponents/TextInput.jsx";
import FileInput from "../components/jsxComponents/FileInput.jsx";
import Button from "../components/jsxComponents/Button.jsx";
import FormContainer from "./FormContainer.jsx";
import PageContainer from "./PageContainer.jsx";
import { updateUserService, updateAvatarService } from "../../services/userService.js";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
	const usernameRef = useRef();
	const avatarRef = useRef();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const username = usernameRef.current.value;
		let avatar = avatarRef.current.files[0];
		/* avatar = avatar ? avatar : null; */
		const formData = new FormData();
		if (avatar) formData.append("avatar", avatar);
		try {
			if (username) {
				await updateUserService(username);
				usernameRef.current.value = "";
				showToast("Usuario actualizado correctamente", "success");
			}
			if (avatar) {
				await updateAvatarService(avatar);
				avatarRef.current.value = "";
				showToast("Avatar actualizado correctamente", "success");
			}
			navigate("/users/profile", { replace: true });
			window.location.reload();
		} catch (err) {
			showToast(err.message, "error");
		}
	};
	return (
		<>
			<PageContainer>
				<FormContainer>
					<form onSubmit={handleSubmit} className="space-y-6">
						<TextInput id="username" label="Tu nombre:" placeholder="Tu nombre" ref={usernameRef} />
						<FileInput id="avatar" label="Avatar:" ref={avatarRef} />
						<Button type="submit" text="Modificar Perfil" />
					</form>
				</FormContainer>
			</PageContainer>
		</>
	);
};

export default ProfileForm;
