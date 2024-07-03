import getPool from "../../db/getPool.js"

const joinRequestModel = async (requestId,characterId,guildId)=>{
    const pool = getPool();
    await pool.query('INSERT INTO join_requests(id,character_id,guild_id) VALUES(?,?,?)'[requestId,characterId,guildId])
    res.status(201).send({message:"solicitud para unión a guild recibida"})
}

export default joinRequestModel;