import getPool from "../../db/getPool.js";

const insertGuildMasterModel = async (guildId, characterName) => {
	const pool = await getPool();
	await pool.query(`UPDATE characters SET guild_id = ?, role = 'staff' WHERE character_name = ?`, [guildId, characterName]);
};

export default insertGuildMasterModel;
