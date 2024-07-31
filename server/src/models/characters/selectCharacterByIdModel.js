import getPool from "../../db/getPool.js";

const selectCharacterByIdModel = async (characterId) => {
	const pool = await getPool();
	const character = await pool.query(
		`
        SELECT * FROM characters WHERE id = ?`,
		[characterId]
	);
	return character;
};

export default selectCharacterByIdModel;
