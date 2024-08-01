import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
const { VITE_API_URL } = import.meta.env;
import { CharacterContext } from "../context/CharacterContext";

const CharacterSelectionComponent = ({ characters }) => {
	const { selectedCharacter, characterSelection } = useContext(CharacterContext);
	const [selectedOption, setSelectedOption] = useState(null);
	console.log("CharacterSelectionComponent - personajes", characters);

	useEffect(() => {
		// Formatea los datos para react-select
		const options = characters.map((character) => ({
			value: character.id,
			label: (
				<div className="flex items-center">
					{character.character_avatar?.length === 0 ? (
						<img
							src={`${VITE_API_URL}/${character?.character_avatar}`}
							alt={`${character.character_name} avatar`}
							className="w-8 h-8 rounded-full mr-2"
						/>
					) : (
						<img src="/default-guild.png" alt="default-avatar" className="w-8 h-8 rounded-full mr-2" />
					)}
					<span className="text-gray-700">{character.character_name}</span>
				</div>
			),
		}));

		// Encuentra y selecciona la opción correspondiente si `selectedCharacter` existe
		if (selectedCharacter) {
			const currentOption = options.find((option) => option.value === selectedCharacter.id);
			setSelectedOption(currentOption);
			console.log("CharacterSelectionComponent - selectedChar", selectedCharacter);
		}
	}, [characters, selectedCharacter]);

	const handleChange = (selectedOption) => {
		const characterId = selectedOption.value;
		characterSelection(characterId);
	};

	

	return (
		<div className="p-4">
			{characters ? (
				<div>
					<label htmlFor="characters" className="block  text-gray-700 text-sm font-bold mb-2">
					</label>
					<Select
						options={characters.map((character) => ({
							value: character.id,
							label: (
								<div className="flex items-center">
									{character.avatar?.length > 0 ? (
										<img
											src={`${VITE_API_URL}/${character?.avatar}`}
											alt={`${character.character_name} avatar`}
											className="w-8 h-8 rounded-full mr-2"
										/>
									) : (
										<img src="/default-guild.png" alt="default-avatar" className="w-8 h-8 rounded-full mr-2" />
									)}
									<span className=" text-gray-700">{character.character_name}</span>
								</div>
							),
						}))}
						onChange={handleChange}
						placeholder="Selecciona un personaje"
						components={{ Option: CustomOption }}
						value={selectedOption}
					/>
				</div>
			) : (
				<div className="text-gray-700">Cargando personajes...</div>
			)}
		</div>
	);
};

const CustomOption = (props) => {
	const { data, innerRef, innerProps } = props;
	return (
		<div ref={innerRef} {...innerProps}>
			{data.label}
		</div>
	);
};

CharacterSelectionComponent.propTypes = {
	characters: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			class: PropTypes.string.isRequired,
			avatar: PropTypes.string.isRequired,
		})
	).isRequired,
};
CustomOption.propTypes = {
	data: PropTypes.shape({
		label: PropTypes.node.isRequired,
	}).isRequired,
	innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
	innerProps: PropTypes.object.isRequired,
};

export default CharacterSelectionComponent;
