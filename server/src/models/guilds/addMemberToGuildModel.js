import getPool from "../../db/getPool.js";

const addMemberToGuildModel = async (characterId, guildId) => {
	const pool = await getPool();
	await pool.query(`UPDATE characters SET guild_id = ? WHERE id = ?`, [guildId, characterId]);
};

export default addMemberToGuildModel;
