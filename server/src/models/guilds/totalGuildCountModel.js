import getPool from "../../db/getPool.js";

const totalGuildCountModel = async () => {
	const pool = await getPool();
	const [rows] = await pool.query(`SELECT COUNT(id) as totalGuilds FROM guilds`);
	return rows[0].totalGuilds;
};

export default totalGuildCountModel;
