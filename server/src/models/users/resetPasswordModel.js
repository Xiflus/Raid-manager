import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import { selectUserByRecoverCodeModel } from "./index.js";
import { recoveryCodeError } from "../../services/errorService.js";

const resetPasswordModel = async (recoverPassCode, newPassword) => {
    const pool = await getPool();
    const user = await selectUserByRecoverCodeModel(recoverPassCode);

    if (!user || user.recoverPassCode !== recoverPassCode) {
        recoveryCodeError();
    }

    const hashedPass = await bcrypt.hash(newPassword, 12);

    await pool.query(
        `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode]
    );
};

export default resetPasswordModel;
