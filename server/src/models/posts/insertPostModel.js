import getPool from "../../db/getPool.js";

const insertPostModel = async (entryId, title, content, characterId) => {
	const pool = await getPool();

	const [entry] = await pool.query(`INSERT INTO posts (id, tittle, content, character_id) VALUES (?, ?, ?, ?)`, [
		entryId,
		title,
		content,
		characterId,
	]);

	return entry.id;
};

export default insertPostModel;
