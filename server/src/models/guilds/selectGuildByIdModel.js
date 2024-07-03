import getPool from "../../db/getPool.js";

const selectGuildByIdModel = async (guildName) => {
	const pool = await getPool();
	const [guilds] = await pool.query("SELECT * FROM guilds WHERE name = ?", [guildName]);
	if (guilds.length === 0) {
		notFoundError(guildName);
	}
	return guilds;
};

export default selectGuildByIdModel;
