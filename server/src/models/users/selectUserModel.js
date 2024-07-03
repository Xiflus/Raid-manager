import getPool from "../../db/getPool";

const selectUserModel = async (email = "", userName = "") => {
	const pool = await getPool();

	//comprobar usuario
	const [users] = await pool.query(`SELECT id, password, role FROM users WHERE email = ? AND username = ?`, [email || userName]);

	return users[0];
};

export default selectUserModel;
