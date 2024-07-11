import uuid4 from "uuid4";
import getPool from "../../db/getPool.js";
import { characterlAlreadyRegisterError } from "../../services/errorService.js";

const insertCharacterModel = async (characterName, characterClass, avatar, userId) => {
	let pool = await getPool();
	let [characters] = await pool.query("SELECT id FROM characters WHERE character_name = ?", [characterName]);

	if (characters.length > 0) characterlAlreadyRegisterError(characterName);

	// insertar el usario
	const newCharacter = await pool.query(
		`INSERT INTO characters(id, character_name, character_avatar, character_class, user_id) VALUES(?, ?, ?, ?, ?)`,
		[uuid4(), characterName, avatar, characterClass, userId]
	);
	return [newCharacter];
};

export default insertCharacterModel;
