import getPool from "../../db/getPool.js";

const selectUserByRecoverCodeModel = async (recoverPassCode) => {
    const pool = await getPool();

    // Comprobar usuario por recoverPassCode
    const [users] = await pool.query(
        `SELECT id, email, password, role, active, recoverPassCode FROM users WHERE recoverPassCode = ?`,
        [recoverPassCode]
    );

    return users[0];
};

export default selectUserByRecoverCodeModel;
