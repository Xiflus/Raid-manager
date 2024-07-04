import getPool from "../../db/getPool.js";

const selectGuildByIdModel = async (guildId) => {
	const pool = await getPool();
	const [guild] = await pool.query(
		`
		SELECT
		g.id,
		g.name,
		g.avatar,
		g.description,
		g.userId AS owner_id,
		COUNT(c.id) AS members,
		COUNT(rp.id) AS progress
		FROM
		guilds g
		LEFT JOIN
		characters c ON g.id = c.guild_id
		LEFT JOIN
		raid_progress rp ON g.id = rp.guild_id
		WHERE
		g.id = ?
		GROUP BY g.id;		
		`,
		[guildId]
	);

	return guild;
};

export default selectGuildByIdModel;
