import getPool from "../../db/getPool.js";

const totalPostCountModel = async () => {
	const pool = await getPool();
	const [post] = await pool.query(`SELECT COUNT(id) as totalPosts FROM posts`);
	return post[0].totalPosts;
};

export default totalPostCountModel;
