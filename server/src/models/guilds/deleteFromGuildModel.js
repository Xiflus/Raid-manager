import getPool from "../../db/getPool"

const deleteFromGuildModel = async(characterId)=>{
    const pool = getPool();
    await pool.query('DELETE FROM characters(guild_id) WHERE id=? ',[characterId]) 
}
export default deleteFromGuildModel;