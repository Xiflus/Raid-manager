
import toast from "react-hot-toast";
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
          const guildPromises = charactersWithGuild.map((character) =>
            getGuildService(character.guildId)
          );
          const characterGuildDetails = await Promise.all(guildPromises);

          // Log para verificar la estructura
          console.log("Character Guild Details:", characterGuildDetails);

          // Usa un Map para combinar varias respuestas
          const guildDetailsMap = new Map();

          characterGuildDetails.forEach(response => {
            if (response && response.guild && response.guild.length > 0) {
              const guild = response.guild[0]; // Asumiendo que quieres el primer elemento del array
              console.log("Guild Data:", guild);
              // Añade o actualiza el mapa
              guildDetailsMap.set(guild.id, guild);
            } else {
              toast.error("Unexpected response format");
            }
          });

          // Convierte el Map en un objeto
          const guildDetailsObject = Object.fromEntries(guildDetailsMap.entries());

          setGuildDetails(guildDetailsObject);
        } catch (err) {
          setError("Error al buscar los datos de la hermandad");
          toast.error("Error al buscar los datos de la hermandad", err);
        } finally {
          setLoading(false);
        }
      };

      if (charactersWithGuild.length > 0) {
        fetchGuildDetails();
      } else {
        toast.error("No tienes ningún personaje con hermandad");
        setLoading(false);
      }
    }
  }, [userCharacters]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Personajes con Hermandades</h1>
      <ul>
        {filteredCharacters.map((character) => (
          <li key={character.guildId}>
            <p>Nombre de la hermandad: {guildDetails[character.guildId]?.name || "Hermandad no encontrada"}</p>
            <p>Personaje: {character.characterName}</p>
            <p>Avatar:{}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

UserGuildListComponent.propTypes = {};

export default UserGuildListComponent;