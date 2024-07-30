/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createContext, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { getUserCharacterService, selectCharacterService } from "../../services/characterService.js";

export const CharacterContext = createContext(null);

export const CharacterProvider = ({ children }) => {
	const { authUser } = useContext(AuthContext);
	const [userCharacters, setUserCharacters] = useState(null);
	const [selectedCharacter, setSelectedCharacter] = useState(() => {
		const savedCharacter = sessionStorage.getItem("selectedCharacter");
		return savedCharacter ? JSON.parse(savedCharacter) : null;
	});
	const userId = authUser?.id;

	const fetchUserCharacters = async () => {
		if (!userId) {
			setUserCharacters(null);
			setSelectedCharacter(null);
			return;
		}
		try {
			const { characters } = await getUserCharacterService(userId);
			setUserCharacters(characters);
		} catch (err) {
			toast.error(err.message);
		}
	};
	useEffect(() => {
		fetchUserCharacters();
	}, [userId]);

	const characterSelection = async (characterId) => {
		try {
			const data = await selectCharacterService(characterId);
			toast.success(data.message);
			const character = data.character[0];
			setSelectedCharacter(character);
			sessionStorage.setItem("selectedCharacter", JSON.stringify(character));
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<CharacterContext.Provider value={{ userCharacters, selectedCharacter, characterSelection, setSelectedCharacter, fetchUserCharacters }}>
			{children}
		</CharacterContext.Provider>
	);
};

CharacterProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
