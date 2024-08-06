import { showToast } from "../utils/toast.jsx";
import { useEffect, useState, useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import { getGuildService } from "../../services/guildService";
import { Link } from "react-router-dom";

const UserGuildListComponent = () => {
  const {
    userCharacters,
    selectedCharacter,
    characterSelection,
    setSelectedCharacter,
  } = useContext(CharacterContext);

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
          // sin id:character.id no me salía directamente el botón
          id: character.id,
        }));
      setFilteredCharacters(charactersWithGuild);

      const fetchGuildDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const guildPromises = charactersWithGuild.map((character) =>
            getGuildService(character.guildId)
          );
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
          const guildDetailsObject = Object.fromEntries(
            guildDetailsMap.entries()
          );

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
  const isCharacterSelected = selectedCharacter && selectedCharacter.length > 0;
  return (
    <div className="flex flex-col items-center text-white font-bold">
      <h1 className="text-2xl mb-4 mt-8 text-gray-300">
        Personajes con Hermandades
      </h1>
      <ul className="space-y-4">
        {filteredCharacters.map((character) => (
          <li
            key={character.guildId}
            className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md"
          >
            <p className="text-lg">
              Nombre de la hermandad:{" "}
              <Link
                to={`/guilds/${character.guildId}`}
                className="text-blue-500 hover:underline"
              >
                {guildDetails[character.guildId]?.name ||
                  "Hermandad no encontrada"}
              </Link>
            </p>
            <p className="text-lg">
              Personaje miembro: {character.characterName}
            </p>
            {isCharacterSelected &&
              selectedCharacter[0]?.id !== character.id && (
                <button
                  onClick={() => {
                    characterSelection(character.id);
                    // FETCH
                    setSelectedCharacter([
                      {
                        // character_avatar: null,
                        // character_class: "Rogue",
                        // character_name: "Lina",
                        // createdAt:
                        //     "2024-08-01T17:46:05.000Z",
                        // guild_id:
                        //     "08c77c47-97b3-43fe-adb5-0dae653b470f",
                        // id: "87d942c4-8c7f-4b6b-883b-3ae224c1be75",
                        // modifiedAt:
                        //     "2024-08-01T17:47:47.000Z",
                        // role: "staff",
                        // user_id:
                        //     "85e8b84c-6ebf-4464-9000-b0f1eec03e13",
                      },
                    ]);
                  }}
                  className="text-blue-500 hover:underline mt-2"
                >
                  Visitar hermandad como {character.characterName}
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
UserGuildListComponent.propTypes = {};

export default UserGuildListComponent;
