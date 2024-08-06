import { useRef } from "react";
import { useParams } from "react-router-dom";
import { showToast } from "../../utils/toast.jsx";
import { editGuildService } from "../../../services/guildService.js";
import TextInput from "../jsxComponents/TextInput.jsx";
import TextArea from "../jsxComponents/TextArea.jsx";
import FileInput from "../jsxComponents/FileInput.jsx";
import Button from "../jsxComponents/Button.jsx";
import PropTypes from "prop-types";

const EditGuildForm = ({ onSubmit }) => {
	const guildnameRef = useRef();
	const descriptionRef = useRef();
	const avatarRef = useRef();
	const { guildId } = useParams();

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
		if (avatar) formData.append("avatar", avatar);

		try {
			await editGuildService({ guildId, formData });
			showToast("Hermandad modificada correctamente", "success");
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
			<Button type="submit" text="Modificar Hermandad" />
		</form>
	);
};

EditGuildForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default EditGuildForm;
