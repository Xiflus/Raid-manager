import getPool from "../../db/getPool.js";

const selectAllJoinRequestsModel = async (guildId) => {
	const pool = await getPool();

	const [requests] = await pool.query(`SELECT * FROM join_requests WHERE guild_id = ?`, [guildId]);

	return requests;
};

export default selectAllJoinRequestsModel;
