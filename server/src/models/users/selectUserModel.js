import getPool from "../../db/getPool.js";

const selectUserModel = async (username) => {
	const pool = await getPool();

	//comprobar usuario
	const [users] = await pool.query(`SELECT id, password, role, active FROM users WHERE username = ?`, [username]);

	return users[0];
};

export default selectUserModel;
