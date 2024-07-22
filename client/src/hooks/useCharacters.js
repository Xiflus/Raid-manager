import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { selectCharactersService } from "../../services/characterService";

const useCharacters = () => {
	const [characters, setCharacters] = useState([]);
	const fetchCharacters = async () => {
		try {
			const { characters } = await selectCharactersService();
			console.log("characters", characters);
			setCharacters(characters);
		} catch (error) {
			toast.error(error.message);
		}
	};
	useEffect(() => {
		fetchCharacters();
	}, []);
	return { characters };
};

export default useCharacters;
