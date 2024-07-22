import { useRef } from "react";

import toast from "react-hot-toast";

import { createCharacterService } from "../../services/characterService.js";

const CreateCharacterPage = () => {
	const nameRef = useRef();
	const characterClassRef = useRef();
	const avatarRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const characterClass = characterClassRef.current.value;
		let avatar = avatarRef.current.files[0];
		avatar = avatar ? avatar : null;

		const formData = new FormData();
		formData.append("characterName", name);
		formData.append("characterClass", characterClass);
		if (avatar) formData.append("avatar", avatar);

		try {
			console.log("formData", formData);
			await createCharacterService(formData);
			toast.success("Personaje creado correctamente");
			nameRef.current.value = "";
			characterClassRef.current.value = "";
			avatarRef.current.value = "";
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<main className="">
			<h2>Creación de personaje</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Nombre del personaje:</label>
				<input type="text" id="name" ref={nameRef} />

				<label htmlFor="class">Selecciona una clase:</label>
				<select ref={characterClassRef} id="class">
					<option value="Hunter">Cazador</option>
					<option value="Wizard">Mago</option>
					<option value="Warlock">Brujo</option>
				</select>

				<label htmlFor="avatar">Avatar:</label>
				<input type="file" id="avatar" ref={avatarRef} />
				<div>
					<button type="submit">Crear personaje</button>
				</div>
			</form>
		</main>
	);
};

export default CreateCharacterPage;
