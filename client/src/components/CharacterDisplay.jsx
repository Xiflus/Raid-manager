/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import CharacterSelectionComponent from "./CharacterSelectionComponent";
import NotCharacterComponent from "./NotCharacterComponent";

const CharacterDisplay = () => {
	const { userCharacters } = useContext(CharacterContext);
	if (!userCharacters || userCharacters.length < 0) {
		return <NotCharacterComponent />;
	}
	return <CharacterSelectionComponent characters={userCharacters} />;
};

export default CharacterDisplay;
