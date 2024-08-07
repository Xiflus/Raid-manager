/* eslint-disable no-unused-vars */
import { useRef, useContext } from "react";
import { showToast } from "../utils/toast.jsx";
import { createCharacterService } from "../../services/characterService.js";
import { CharacterContext } from "../context/CharacterContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import TextInput from "../components/jsxComponents/TextInput.jsx";
import SelectInput from "../components/jsxComponents/SelectInput.jsx";
import FileInput from "../components/jsxComponents/FileInput.jsx";
import Button from "../components/jsxComponents/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";
import { useNavigate } from "react-router-dom";

const characterOptions = [
	{
		value: "Warrior",
		label: "Guerrero",
		img: "/public/imgCharacters/guerrero.png",
	},
	{
		value: "Paladin",
		label: "Paladin",
		img: "/public/imgCharacters/paladin.png",
	},
	{
		value: "Hunter",
		label: "Cazador",
		img: "/public/imgCharacters/cazador.png",
	},
	{
		value: "Rogue",
		label: "Picaro",
		img: "/public/imgCharacters/picaro.png",
	},
	{
		value: "Priest",
		label: "Sacerdote",
		img: "/public/imgCharacters/sacerdote.png",
	},
	{
		value: "Shaman",
		label: "Chaman",
		img: "/public/imgCharacters/chaman.png",
	},
	{ value: "Mage", label: "Mago", img: "/public/imgCharacters/mago.png" },
	{
		value: "Warlock",
		label: "Brujo",
		img: "/public/imgCharacters/brujo.png",
	},
	{ value: "Monk", label: "Monje", img: "/public/imgCharacters/monje.png" },
	{
		value: "Druid",
		label: "Druida",
		img: "/public/imgCharacters/druida.png",
	},
	{
		value: "Demon Hunter",
		label: "Cazador de demonios",
		img: "/public/imgCharacters/cazadorDeDemonios.png",
	},
	{
		value: "Death Knight",
		label: "Caballero de la muerte",
		img: "/public/imgCharacters/caballeroDeLaMuerte.png",
	},
	{
		value: "Evoker",
		label: "Evocador",
		img: "/public/imgCharacters/evocador.png",
	},
];

const CreateCharacterPage = () => {
	const { authUser } = useContext(AuthContext);
	!authUser && window.location.replace("/login");
	const { fetchUserCharacters } = useContext(CharacterContext);
	const nameRef = useRef();
	const characterClassRef = useRef();
	const avatarRef = useRef();
	const navigate = useNavigate();

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
			showToast("Personaje creado correctamente", "success");
			nameRef.current.value = "";
			characterClassRef.current.value = "";
			avatarRef.current.value = "";
			await fetchUserCharacters();
			navigate("/");
		} catch (err) {
			showToast(err.message, "error");
		}
	};

	return (
		<PageContainer>
			<FormContainer>
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Creación de Personaje</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<TextInput id="name" label="Nombre del personaje:" placeholder="Nombre del personaje" ref={nameRef} required />
					<SelectInput id="class" label="Selecciona una clase:" options={characterOptions} ref={characterClassRef} required />
					<FileInput id="avatar" label="Avatar:" ref={avatarRef} />
					<Button type="submit" text="Crear Personaje" />
				</form>
			</FormContainer>
		</PageContainer>
	);
};

export default CreateCharacterPage;
