import getPool from "../../db/getPool.js";

const selectGuildByIdModel = async (guildName) => {
  const pool = getPool();
  const [guild] = await pool.query(
    "SELECT * FROM guild WHERE name = ?",
    [guildName]
  );
  if (guild.length === 0) {

    notFoundError(guildName);
  }
  return guild[0];

};

export default selectGuildByIdModel;