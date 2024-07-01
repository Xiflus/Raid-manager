import getPool from "../../db/getPool";
import{v4 as uuid} from "uuid";
import bcrypt from "bcrypt";

const insertGuildModel = async(name, avatar, description, userId) => {
    let pool = getPool();
    let [guilds] = await pool.query("SELECT id FROM guild WHERE name = ?", [name])
      
        if(guilds.length > 0) guildlALreadyRegisterError();
      
        // insertar el usario
        const newGuild = await pool.
        query(
           `INSERT INTO guilds(id, name, avatar, description, userId) VALUES(?, ?, ?, ?, ?)`,
           [uuid(), name, avatar, description, userId]
      );
        return newGuild;
      };
      
      export default insertGuildModel;