/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CharacterContext } from "../context/CharacterContext";
import CharacterSelectionComponent from "./CharacterSelectionComponent";

const CharacterDisplay = () => {
	const { userCharacters } = useContext(CharacterContext);
	console.log("CharacterDisplay", userCharacters);
	if (!userCharacters || userCharacters.length < 0) {
		return (
			<h2>
				No hay personajes creados, crea uno <Link to="/characters/create">aquí</Link>
			</h2>
		);
	}
	return (
		<>
			<h2>Personajes</h2>
			<CharacterSelectionComponent characters={userCharacters} />
		</>
	);
};

export default CharacterDisplay;
