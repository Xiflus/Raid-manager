import getPool from "../../db/getPool.js";

const totalGuildCountModel = async () => {
	const pool = getPool();
	const [guilds] = await pool.query(`SELECT COUNT(id) as totalGuilds FROM guilds`);
	return guilds[0].totalGuilds;
};

export default totalGuildCountModel;
