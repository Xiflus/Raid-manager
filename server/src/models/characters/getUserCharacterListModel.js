import getPool from "../../db/getPool.js";
import { userCharactersNotFoundError } from "../../services/errorService.js";

const getUserCharacterListModel = async (userId) => {
	const pool = await getPool();
	const [characters] = await pool.query("SELECT * FROM characters WHERE user_id = ?", [userId]);
	if (characters.length === 0) {
		userCharactersNotFoundError();
	}
	return characters;
};

export default getUserCharacterListModel;
