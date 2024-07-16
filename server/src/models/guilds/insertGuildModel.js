import uuid4 from "uuid4";
import getPool from "../../db/getPool.js";
import { guildlALreadyRegisterError } from "../../services/errorService.js";

const insertGuildModel = async (name, avatar, description, userId) => {
	let pool = await getPool();
	let [guilds] = await pool.query("SELECT id FROM guilds WHERE name = ?", [name]);

	if (guilds.length > 0) guildlALreadyRegisterError(name);

	const guildId = uuid4();

	// insertar el usario
	const newGuild = await pool.query(`INSERT INTO guilds(id, name, avatar, description, userId) VALUES(?, ?, ?, ?, ?)`, [
		guildId,
		name,
		avatar,
		description,
		userId,
	]);
	return guildId;
};

export default insertGuildModel;
