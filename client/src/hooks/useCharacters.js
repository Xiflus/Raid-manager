import { useState, useEffect } from "react";
import { showToast } from "../utils/toast.jsx";
import { selectCharactersService } from "../../services/characterService";

const useCharacters = () => {
	const [characters, setCharacters] = useState([]);
	const fetchCharacters = async () => {
		try {
			const { characters } = await selectCharactersService();
			setCharacters(characters);
		} catch (error) {
			showToast(error.message, "error");
		}
	};
	useEffect(() => {
		fetchCharacters();
	}, []);
	return { characters };
};

export default useCharacters;
