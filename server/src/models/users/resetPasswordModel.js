import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import { selectUserByEmailModel } from "./index.js";
import { recoveryCodeError } from "../../services/errorService.js";

const resetPasswordModel = async (email, recoverPassCode, newPassword) => {
	const pool = await getPool();
	const users = await selectUserByEmailModel(email);
	const user = users[0];
	console.log("USUARIO", user);

	if (!user || user.recoverPassCode !== recoverPassCode) {
		recoveryCodeError();
	}

	const hashedPass = await bcrypt.hash(newPassword, 12);

	await pool.query(`UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`, [hashedPass, recoverPassCode]);
};

export default resetPasswordModel;
