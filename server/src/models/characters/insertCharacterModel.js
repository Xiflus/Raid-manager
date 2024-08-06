import uuid4 from "uuid4";
import getPool from "../../db/getPool.js";
import { characterlAlreadyRegisterError } from "../../services/errorService.js";

const insertCharacterModel = async (characterName, characterClass, avatar, userId) => {
	const pool = await getPool();
	const [characters] = await pool.query("SELECT id FROM characters WHERE character_name = ?", [characterName]);

	if (characters.length > 0) characterlAlreadyRegisterError(characterName);
	const characterId = uuid4();

	await pool.query(`INSERT INTO characters (id, character_name, character_avatar, character_class, user_id) VALUES (?, ?, ?, ?, ?)`, [
		characterId,
		characterName,
		avatar,
		characterClass,
		userId,
	]);

	// Recuperar el personaje recién insertado para poder añadirlo en el front
	const [newCharacter] = await pool.query(
		`SELECT id, character_name AS characterName, character_avatar AS avatar, character_class AS characterClass, user_id AS userId 
         FROM characters 
         WHERE id = ?`,
		[characterId]
	);

	return newCharacter[0]; // Devuelve el primer elemento
};

export default insertCharacterModel;
