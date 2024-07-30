import { useRef, useContext } from "react";
import toast from "react-hot-toast";
import { createCharacterService } from "../../services/characterService.js";
import { CharacterContext } from "../context/CharacterContext.jsx";
import TextInput from "../components/jsxComponents/TextInput.jsx";
import SelectInput from "../components/jsxComponents/SelectInput.jsx";
import FileInput from "../components/jsxComponents/FileInput.jsx";
import Button from "../components/jsxComponents/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

const CreateCharacterPage = () => {
	const { fetchUserCharacters } = useContext(CharacterContext);
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
			const newCharacter = await createCharacterService(formData);
			console.log("CreateCharacterPage", newCharacter);
			toast.success("Personaje creado correctamente");
			nameRef.current.value = "";
			characterClassRef.current.value = "";
			avatarRef.current.value = "";
			await fetchUserCharacters();
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<PageContainer>
			<FormContainer>
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Creación de Personaje</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<TextInput id="name" label="Nombre del personaje:" placeholder="Nombre del personaje" ref={nameRef} required />
					<SelectInput
						id="class"
						label="Selecciona una clase:"
						options={[
							{ value: "Warrior", label: "Guerrero" },
							{ value: "Paladin", label: "Paladín" },
							{ value: "Hunter", label: "Cazador" },
							{ value: "Rogue", label: "Pícaro" },
							{ value: "Priest", label: "Sacerdote" },
							{ value: "Shaman", label: "Chamán" },
							{ value: "Mage", label: "Mago" },
							{ value: "Warlock", label: "Brujo" },
							{ value: "Monk", label: "Monje" },
							{ value: "Druid", label: "Druida" },
							{
								value: "Demon Hunter",
								label: "Cazador de demonios",
							},
							{
								value: "Death Knight",
								label: "Caballero de la muerte",
							},
							{ value: "Evoker", label: "Evocador" },
						]}
						ref={characterClassRef}
						required
					/>
					<FileInput id="avatar" label="Avatar:" ref={avatarRef} />
					<Button type="submit" text="Crear Personaje" />
				</form>
			</FormContainer>
		</PageContainer>
	);
};

export default CreateCharacterPage;
