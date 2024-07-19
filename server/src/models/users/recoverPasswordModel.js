import getPool from "../../db/getPool.js";
import { notFoundError } from "../../services/errorService.js";

const recoverPasswordModel = async (email, recoverPassCode) => {
    const pool = await getPool();
    const users = await pool.query(
        `SELECT id, recoverPassCode FROM users WHERE email = ?`,
        [email]
    );
    const user = users[0];
    if (!user) {
        notFoundError("usuario");
    }

    await pool.query("UPDATE users SET recoverPassCode = ? WHERE email = ?", [
        recoverPassCode,
        email,
    ]);
};

export default recoverPasswordModel;
