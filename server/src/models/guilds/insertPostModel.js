import getPool from "../../db/getPool";

insertPostModel = async (content, userId) => {
	const pool = await getPool();

	const [entry] = await pool.query(`INSERT INTO posts (content, user_id) VALUES (?, ?)`, [content, userId]);

	return post.insertId;
};

export default insertPostModel;
