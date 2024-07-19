import getPool from "../../db/getPool.js";

const selectUserCharacterModel = async (userId, characterId) => {
	const pool = await getPool();
	const characters = await pool.query(
		`
        SELECT * FROM characters WHERE id = ? AND user_id = ?`,
		[characterId, userId]
	);
	return characters;
};

export default selectUserCharacterModel;
