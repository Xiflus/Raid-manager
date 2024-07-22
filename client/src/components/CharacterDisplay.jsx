import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CharacterSelection from "./CharacterSelection";

const CharacterDisplay = ({ characters }) => {
	if (!characters || characters.length < 0) {
		return (
			<h2>
				No hay personajes creados, crea uno <Link to="/characters/create">aquí</Link>
			</h2>
		);
	}
	return (
		<>
			<h2>Personajes</h2>
			<ul>
				{characters[0]?.map((character) => {
					return <CharacterSelection character={character} key={character.id} />;
				})}
			</ul>
		</>
	);
};

export default CharacterDisplay;
//validamos los props
CharacterDisplay.propTypes = {
	characters: PropTypes.array,
};
