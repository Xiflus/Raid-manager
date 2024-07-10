import getPool from "../../db/getPool.js";

const selectUserByIdModel = async (userId) => {
	const pool = await getPool();
	const [user] = await pool.query(`SELECT id, username, password FROM users WHERE id = ?`, [userId]);
	return user[0];
};

export default selectUserByIdModel;
