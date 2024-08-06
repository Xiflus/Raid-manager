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
    }

    // Construir la consulta de actualización dinámicamente
    const updates = [];
    const params = [];

    if (username) {
        updates.push("username = ?");
        params.push(username);
    }

    if (avatar) {
        updates.push("avatar = ?");
        params.push(avatar);
    }

    if (updates.length > 0) {
        params.push(userId);
        const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
        await pool.query(query, params);
    }
};

export default updateUserModel;
