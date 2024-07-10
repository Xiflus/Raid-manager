import getPool from "../../db/getPool.js";
import { guildlALreadyRegisterError } from "../../services/errorService.js";

const editGuildModel = async (guildId, name, description, avatar) => {
	const pool = await getPool();
	if (name) {
		const [guilds] = await pool.query("SELECT id FROM guilds WHERE name = ?", [name]);
		if (guilds.length > 0) {
			guildlALreadyRegisterError(name);
		}
		await pool.query("UPDATE guilds SET name = ? WHERE id = ?", [name, guildId]);
	}
	if (description) {
		await pool.query("UPDATE guilds SET description = ? WHERE id = ?", [description, guildId]);
	}

	if (avatar) {
		await pool.query("UPDATE guilds SET avatar = ? WHERE id = ?", [avatar, guildId]);
	}
};

export default editGuildModel;
