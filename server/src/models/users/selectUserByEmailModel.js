import getPool from "../../db/getPool.js";

const selectUserModel = async (email) => {
	const pool = await getPool();

	//comprobar usuario
	const users = await pool.query(`SELECT id, password, role, active, recoverPassCode FROM users WHERE email = ?`, [email]);

	return users[0];
};

export default selectUserModel;
