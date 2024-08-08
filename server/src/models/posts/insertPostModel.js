import getPool from "../../db/getPool.js";

const insertPostModel = async (postId, title, content, characterId, guildId) => {
	console.log("insertPostModel -> characterId", characterId);
	console.log("insertPostModel -> guildId", guildId);

	const pool = await getPool();

	const [entry] = await pool.query(`INSERT INTO posts (id, tittle, content, character_id, guild_id) VALUES (?, ?, ?, ?, ?)`, [
		postId,
		title,
		content,
		characterId,
		guildId,
	]);

	return entry.id;
};

export default insertPostModel;
