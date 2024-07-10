import getPool from "../../db/getPool.js";

const selectJoinReqByIdModel = async (joinReqId) => {
	const pool = await getPool();
	const request = await pool.query(
		`
        SELECT
            id,
            character_id,
            guild_id,
            status
        FROM join_requests
        WHERE id = ?`,
		[joinReqId]
	);

	return request[0];
};

export default selectJoinReqByIdModel;
