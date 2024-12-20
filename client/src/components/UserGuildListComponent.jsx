import { showToast } from "../utils/toast.jsx";
import { useEffect, useState, useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import { getGuildService } from "../../services/guildService";
import { Link } from "react-router-dom";

const UserGuildListComponent = () => {
	const { userCharacters, selectedCharacter, characterSelection } = useContext(CharacterContext);
	console.log("UserGuildListComponent -> userCharacters", userCharacters);

	const [filteredCharacters, setFilteredCharacters] = useState([]);
	const [guildDetails, setGuildDetails] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (userCharacters) {
			const charactersWithGuild = userCharacters
				.filter((character) => character.guild_id !== null)
				.map((character) => ({
					characterName: character.character_name,
					guildId: character.guild_id,
					// sin id:character.id no me salía directamente el botón
					id: character.id,
				}));
			setFilteredCharacters(charactersWithGuild);
			console.log("UserGuildListComponent -> charactersWithGuild", charactersWithGuild);

			const fetchGuildDetails = async () => {
				setLoading(true);

				try {
					const guildPromises = charactersWithGuild.map((character) => getGuildService(character.guildId));
					const characterGuildDetails = await Promise.all(guildPromises);

					// Usa un Map para combinar varias respuestas
					const guildDetailsMap = new Map();

					characterGuildDetails.forEach((response) => {
						if (response && response.guild && response.guild.length > 0) {
							const guild = response.guild[0]; // Asumiendo que quieres el primer elemento del array
							// Añade o actualiza el mapa
							guildDetailsMap.set(guild.id, guild);
						}
					});

					// Convierte el Map en un objeto
					const guildDetailsObject = Object.fromEntries(guildDetailsMap.entries());

					setGuildDetails(guildDetailsObject);
				} catch (err) {
					showToast("Error al buscar los datos de la hermandad", "error");
				} finally {
					setLoading(false);
				}
			};

			fetchGuildDetails();
		}
	}, [userCharacters]);

	if (loading) {
		return <p className="text-center text-white"></p>;
	}

	const isCharacterSelected = selectedCharacter && selectedCharacter.length > 0;
	return (
		<div className="flex flex-col items-center text-white font-bold ">
			<h1 className="text-2xl mb-4 mt-8 text-gray-300">Personajes con Hermandades</h1>
			<ul className="space-y-4">
				{filteredCharacters.map((character) => (
					<li
						key={character.guildId}
						className="bg-gray-800 p-4 rounded-lg w-full shadow-orange-semi-transparent max-w-md transition-transform duration-300 hover:scale-105"
					>
						<p className="text-lg">
							Nombre de la hermandad:{" "}
							<Link to={`/guilds/${character.guildId}`} className="text-blue-500 hover:underline">
								{guildDetails[character.guildId]?.name || "Hermandad no encontrada"}
							</Link>
						</p>
						<p className="text-lg">Personaje miembro: {character.characterName}</p>
						{isCharacterSelected ? (
							selectedCharacter[0]?.id !== character.id && (
								<Link
									to={`/guilds/${character.guildId}`}
									onClick={() => {
										characterSelection(character.id);
									}}
									className="text-blue-500 hover:underline mt-2"
								>
									Visitar hermandad como {character.characterName}
								</Link>
							)
						) : (
							<Link
								to={`/guilds/${character.guildId}`}
								onClick={() => {
									characterSelection(character.id);
								}}
								className="text-blue-500 hover:underline mt-2"
							>
								Visitar hermandad como {character.characterName}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserGuildListComponent;
