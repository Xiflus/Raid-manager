import getPool from "../../db/getPool.js";
import { usernameAlreadyRegisteredError } from "../../services/errorService.js";

const updateUserModel = async (username, avatar, userId) => {
  const pool = await getPool();

  if (username) {
    const [users] = await pool.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );
    if (users.length > 0) {
      usernameAlreadyRegisteredError();
    }
    await pool.query(`UPDATE users SET username = ?, avatar = ? WHERE id = ?`, [
      username,
      avatar,
      userId,
    ]);
  }
};

export default updateUserModel;
