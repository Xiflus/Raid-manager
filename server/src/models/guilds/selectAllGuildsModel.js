import getPool from "../../db/getPool.js";

const selectAllGuildsModel = async (guildName = "", avatar = "", description = "", members = "", progress = "", limit, offset) => {
	const pool = await getPool();

	const [guilds] = await pool.query(
		"SELECT g.id, g.guild_name, g.avatar, g.description, g.createdAt FROM guilds g WHERE g.guild_name LIKE ? ORDER BY g. createdAt DESC LIMIT ? OFFSET ?",
		[`%${guildName}%`, `%${avatar}%`, `%${description}%`, limit, offset]
	);

	return guilds;
};

export default selectAllGuildsModel;
