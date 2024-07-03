import getPool from "../../db/getPool.js";

const joinRequestModel = async (requestId, characterId, guildId) => {
	const pool = await getPool();
	await pool.query("INSERT INTO join_requests(id, character_id, guild_id) VALUES(?,?,?)", [requestId, characterId, guildId]);
};

export default joinRequestModel;
