import getPool from "../../db/getPool.js";
import { notFoundError } from "../../services/errorService.js";

const selectCharacterByIdModel = async (characterName) => {
	const pool = await getPool();
	const [characters] = await pool.query("SELECT * FROM characters WHERE character_name = ?", [characterName]);
	if (characters.length === 0) {
		notFoundError(characterName);
	}
	return characters;
};

export default selectCharacterByIdModel;
