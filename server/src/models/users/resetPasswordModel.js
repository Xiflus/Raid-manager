import getPool from "../../db/getPool";
import bcrypt from "bcrypt";

const resetPasswordModel = async (email, recoverPassCode, newPassword) => {
  const pool = await getPool();
  const user = await selectUserModel(email);

  if (!user || user.recoverPassCode !== recoverPassCode) {
    recoveryCodeError();
  }

  const hashedPass = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
    [hashedPass, recoverPassCode]
  );
};

export default resetPasswordModel;
