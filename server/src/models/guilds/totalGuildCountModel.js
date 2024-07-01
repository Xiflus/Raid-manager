import getPool from "../../db/getPool.js";

const totalGuildCountModel = async (guildName = "") => {
	const pool = await getPool();
	const [rows] = await pool.query(`SELECT COUNT(id) as totalGuilds FROM guilds WHERE name LIKE ?`, [`%${guildName}%`]);
	return rows[0].totalGuilds;
};

export default totalGuildCountModel;
