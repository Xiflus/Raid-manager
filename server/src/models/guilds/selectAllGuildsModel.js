import getPool from "../../db/getPool.js";

const selectAllGuildsModel = async (guildName = "", avatar = "", description = "", limit, offset) => {
	const pool = await getPool();

	const [guilds] = await pool.query(
		`SELECT 
		g.id,
		g.name,
		g.avatar,
		g.description,
		g.createdAt,
		COUNT(c.id) AS members,
		COUNT(rp.id) AS progress
		FROM
		guilds g
		LEFT JOIN
		characters c ON g.id = c.guild_id
		LEFT JOIN
		raid_progress rp ON g.id = rp.guild_id
		WHERE 
		g.name LIKE ? 
		AND
		g.avatar LIKE ?
		AND
		g.description LIKE ?
		GROUP BY g.id
		ORDER BY g.createdAt DESC
		LIMIT ? OFFSET ?`,
		[`%${guildName}%`, `%${avatar}%`, `%${description}%`, limit, offset]
	);

	return guilds;
};

export default selectAllGuildsModel;
