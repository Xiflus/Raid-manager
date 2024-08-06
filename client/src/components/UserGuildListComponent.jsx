import { showToast } from "../utils/toast.jsx";
import { useEffect, useState, useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import { getGuildService } from "../../services/guildService";

const UserGuildListComponent = () => {
	const { userCharacters } = useContext(CharacterContext);

	const [filteredCharacters, setFilteredCharacters] = useState([]);
	const [guildDetails, setGuildDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (userCharacters) {
			const charactersWithGuild = userCharacters
				.filter((character) => character.guild_id !== null)
				.map((character) => ({
					characterName: character.character_name,
					guildId: character.guild_id,
				}));
			setFilteredCharacters(charactersWithGuild);

			const fetchGuildDetails = async () => {
				setLoading(true);
				setError(null);
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
					setError("Error al buscar los datos de la hermandad");
					showToast("Error al buscar los datos de la hermandad", "error");
				} finally {
					setLoading(false);
				}
			};

			if (charactersWithGuild.length > 0) {
				fetchGuildDetails();
			} else {
				showToast("No tienes ningún personaje con hermandad", "error");
				setLoading(false);
			}
		}
	}, [userCharacters]);

	if (loading) {
		return <p className="text-center text-white">Cargando...</p>;
	}

	if (error) {
		return <p className="text-center text-red-500">{error}</p>;
	}

	return (
		<div className="flex flex-col items-center text-white font-bold">
			<h1 className="text-2xl mb-4 mt-8 text-gray-300">Personajes con Hermandades</h1>
			<ul className="space-y-4">
				{filteredCharacters.map((character) => (
					<li key={character.guildId} className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
						<p className="text-lg">Nombre de la hermandad: {guildDetails[character.guildId]?.name || "Hermandad no encontrada"}</p>
						<p className="text-lg">Personaje: {character.characterName}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
UserGuildListComponent.propTypes = {};

export default UserGuildListComponent;
