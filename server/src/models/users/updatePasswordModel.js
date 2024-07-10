import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";

const updatePasswordModel = async (userId, newPassword) => {
	const pool = await getPool();
	const hashedPassword = await bcrypt.hash(newPassword, 12);

	await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, userId]);
};

export default updatePasswordModel;
