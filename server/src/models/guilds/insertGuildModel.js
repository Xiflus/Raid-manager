import uuid4 from "uuid4";
import getPool from "../../db/getPool.js";
import { guildlALreadyRegisterError } from "../../services/errorService.js";

const insertGuildModel = async (name, avatar, description, userId) => {
  let pool = await getPool();
  let [guilds] = await pool.query("SELECT id FROM guilds WHERE name = ?", [
    name,
  ]);

  if (guilds.length > 0) guildlALreadyRegisterError();

  // insertar el usario
  const newGuild = await pool.query(
    `INSERT INTO guilds(id, name, avatar, description, userId) VALUES(?, ?, ?, ?, ?)`,
    [uuid4(), name, avatar, description, userId]
  );
  return [newGuild];
};

export default insertGuildModel;
