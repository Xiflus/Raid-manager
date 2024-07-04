import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import { selectUserByEmailModel } from "./index.js";

const resetPasswordModel = async (email, recoverPassCode, newPassword) => {
	const pool = await getPool();
	const user = await selectUserByEmailModel(email);

	if (!user || user.recoverPassCode !== recoverPassCode) {
		recoveryCodeError();
	}

	const hashedPass = await bcrypt.hash(newPassword, 10);

	await pool.query(`UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`, [hashedPass, recoverPassCode]);
};

export default resetPasswordModel;
