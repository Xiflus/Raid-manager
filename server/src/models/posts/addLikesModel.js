import getPool from "../../db/getPool.js";
import uuid4 from "uuid4";

const addLikesModel = async (value, characterId, postsId) => {
	const pool = await getPool();
	const likeId = uuid4();
	const [likes] = await pool.query(
		`
		SELECT id FROM likes WHERE character_id = ? AND postsId = ?`,
		[characterId, postsId]
	);
	console.log("addLikesModel", likes);
	if (likes.length > 0) {
		await pool.query(
			`
			UPDATE likes SET value = ? WHERE character_id = ? AND postsId = ?`,
			[value, characterId, postsId]
		);
		return;
	}
	await pool.query(
		`
        INSERT INTO likes (id, value, character_id, postsId) VALUES (?, ?, ?)`,
		[likeId, characterId, postsId]
	);
};

export default addLikesModel;
