import { useRef, useContext } from "react";
import { showToast } from "../../utils/toast.jsx";
import { createGuildService } from "../../../services/guildService.js";
import TextInput from "../jsxComponents/TextInput.jsx";
import TextArea from "../jsxComponents/TextArea.jsx";
import FileInput from "../jsxComponents/FileInput.jsx";
import Button from "../jsxComponents/Button.jsx";
import PropTypes from "prop-types";
import { CharacterContext } from "../../context/CharacterContext";

const CreateGuildForm = ({ onSubmit }) => {
	const { selectedCharacter } = useContext(CharacterContext);
	const guildnameRef = useRef();
	const descriptionRef = useRef();
	const avatarRef = useRef();
	const characterName = selectedCharacter[0]?.character_name;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = guildnameRef.current.value;
		let description = descriptionRef.current.value;
		let avatar = avatarRef.current.files[0];
		description = description === "" ? null : description;
		avatar = avatar ? avatar : null;

		const formData = new FormData();
		formData.append("name", name);
		if (description) formData.append("description", description);
		formData.append("characterName", characterName);
		if (avatar) formData.append("avatar", avatar);

		try {
			await createGuildService(formData);
			showToast("Hermandad creada correctamente", "success");
			guildnameRef.current.value = "";
			descriptionRef.current.value = "";
			avatarRef.current.value = "";
			if (onSubmit) onSubmit();
		} catch (err) {
			showToast(err.message, "error");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<TextInput id="guildname" label="Nombre de la hermandad:" placeholder="Nombre de la hermandad" ref={guildnameRef} required />
			<TextArea id="description" label="Descripción:" placeholder="Descripción (opcional)" ref={descriptionRef} />
			<FileInput id="avatar" label="Avatar:" ref={avatarRef} />
			<Button type="submit" text="Crear Hermandad" />
		</form>
	);
};

CreateGuildForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default CreateGuildForm;
