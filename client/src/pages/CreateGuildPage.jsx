import { useRef } from "react";
import toast from "react-hot-toast";
import { createGuildService } from "../../services/guildService.js";
import { Link } from "react-router-dom";

const CreateGuildPage = () => {
	const guildnameRef = useRef();
	const descriptionRef = useRef();
	const characterRef = useRef();
	const avatarRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = guildnameRef.current.value;
		let description = descriptionRef.current.value;
		const character = characterRef.current.value;
		let avatar = avatarRef.current.files[0];
		description = description === "" ? null : description;
		avatar = avatar ? avatar : null;

		const formData = new FormData();
		formData.append("name", name);
		if (description) formData.append("description", description);
		formData.append("characterName", character);
		if (avatar) formData.append("avatar", avatar);

		try {
			console.log("formData", formData);
			await createGuildService(formData);
			toast.success("Hermandad creada correctamente");
			guildnameRef.current.value = "";
			descriptionRef.current.value = "";
			characterRef.current.value = "";
			avatarRef.current.value = "";
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<main className="">
			<h2>Creación de hermandad</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor="charactername">Nombre del personaje, GM:</label>
				<input type="text" id="charactername" ref={characterRef} />

				<label htmlFor="guildname">Nombre de la hermandad:</label>
				<input type="text" id="guildname" ref={guildnameRef} required />

				<label htmlFor="description">Descripción:</label>
				<textarea type="textarea" id="description" ref={descriptionRef} />

				<label htmlFor="avatar">Avatar:</label>
				<input type="file" id="avatar" ref={avatarRef} />
				<div>
					<button type="submit">Crear Hermandad</button>
				</div>
			</form>
			<h4>
				Si todavía no tienes un personaje necesitas crearlo antes, puedes hacerlo <Link to="/characters/create">aquí</Link>.
			</h4>
		</main>
	);
};

export default CreateGuildPage;
