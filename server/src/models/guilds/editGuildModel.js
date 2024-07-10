import getPool from "../../db/getPool.js";
import { guildlALreadyRegisterError } from "../../services/errorService.js";

const editGuildModel = async(guildId,name,description)=>{
    const pool = await getPool();
    if (name) {
        const [guilds] = await pool.query("SELECT id FROM guilds WHERE name = ?", [name]);
        if (guilds.length > 0 ){
            guildlALreadyRegisterError();
        }
        await pool.query("UPDATE guilds SET name = ? WHERE id = ?",[name,guildId])
    }
        await pool.query("UPDATE guilds SET description = ? WHERE id = ?",[description,guildId])
}

export default editGuildModel;


