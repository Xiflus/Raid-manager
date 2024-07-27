import { useRef } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { editGuildService } from "../../services/guildService.js";
import TextInput from "../components/TextInput.jsx";
import FileInput from "../components/FileInput.jsx";
import Button from "../components/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

const ProfilePage = () => {
	const usernameRef = useRef();
	const avatarRef = useRef();
	const { userId } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const username = usernameRef.current.value;
		let avatar = avatarRef.current.files[0];
		avatar = avatar ? avatar : null;

		const formData = new FormData();
		formData.append("username", username);
		if (avatar) formData.append("avatar", avatar);

		try {
			await editGuildService({ userId, formData });
			toast.success("Perfil modificado correctamente");
			usernameRef.current.value = "";
			avatarRef.current.value = "";
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<PageContainer>
			<FormContainer>
				{/* Falta crear componentes h1-h2-h3 modularizados */}
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Mi Perfil</h2>
				{/* Modularizar también los formularios */}
				<form onSubmit={handleSubmit} className="space-y-6">
					<TextInput id="username" label="Tu nombre:" placeholder="Tu nombre" ref={usernameRef} required />
					{/* <TextInput id="battletag" label="Tu BatteTag:" placeholder="Tu BattleTag" ref={usernameRef} required /> */}
					<FileInput id="avatar" label="Avatar:" ref={avatarRef} />
					<Button type="submit" text="Modificar Perfil" />
				</form>
			</FormContainer>
		</PageContainer>
	);
};

export default ProfilePage;
