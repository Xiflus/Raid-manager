import getPool from "../../db/getPool.js";

const selectAllJoinRequestsModel = async (guildId) => {
	const pool = await getPool();

	const [requests] = await pool.query(
		`SELECT 
            join_requests.id, 
            join_requests.character_id, 
            join_requests.guild_id, 
            join_requests.status, 
            join_requests.createdAt,
            characters.character_name,
            characters.character_class
        FROM join_requests
        JOIN characters ON join_requests.character_id = characters.id
        WHERE join_requests.guild_id = ?`,
		[guildId]
	);

	return requests;
};

export default selectAllJoinRequestsModel;
