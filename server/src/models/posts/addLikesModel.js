import getPool from "../../db/getPool.js";
import uuid4 from "uuid4";

const addLikesModel = async (value, characterId, postId) => {
	const pool = await getPool();
	const likeId = uuid4();

	const [likes] = await pool.query(`SELECT COUNT(*) as count FROM likes WHERE character_id = ? AND postId = ?`, [characterId, postId]);

	if (likes[0].count > 0) {
		await pool.query(`UPDATE likes SET value = ? WHERE character_id = ? AND postId = ?`, [value, characterId, postId]);
	} else {
		await pool.query(`INSERT INTO likes (id, value, character_id, postId) VALUES (?, ?, ?, ?)`, [likeId, value, characterId, postId]);
	}

	const [[updatedLikes]] = await pool.query(`SELECT COUNT(*) as totalLikes FROM likes WHERE postId = ? AND value = true`, [postId]);

	const [[likedByMe]] = await pool.query(`SELECT value FROM likes WHERE character_id = ? AND postId = ?`, [characterId, postId]);

	return { totalLikes: updatedLikes.totalLikes, likedByMe: likedByMe.value };
};

export default addLikesModel;
