import getPool from "../../db/getPool.js";
import uuid4 from "uuid4";

const addLikesModel = async (value, characterId, postsId) => {
	const pool = await getPool();
	const likeId = uuid4();
	const [likes] = await pool.query(
		`
		SELECT COUNT(*) as count FROM likes WHERE character_id = ? AND postId = ?`,
		[characterId, postsId]
	);
	
	if (likes[0].count > 0) {
		await pool.query(
			`
			UPDATE likes SET value = ? WHERE character_id = ? AND postId = ?`,
			[value, characterId, postsId]
		);
	} else {
		await pool.query(
			`
			INSERT INTO likes (id, value, character_id, postId) VALUES (?, ?, ?, ?)`,
			[likeId, value, characterId, postsId]
		);
	}
	const [[updatedLikes]] = await pool.query(`SELECT COUNT(*) as totalLikes FROM likes WHERE postId = ? AND value = true`, [postsId]);
	return updatedLikes.totalLikes;
};

export default addLikesModel;
