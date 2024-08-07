import getPool from "../../db/getPool.js";
import { characterAlreadyAtGuildError } from "../../services/errorService.js";

const manageGuildRequest = async (characterId, guildId, status, joinReqId) => {
	const pool = await getPool();
	// revisar si el usuario ya existe en la hermandad
	let [characters] = await pool.query("SELECT id, character_name, user_id, guild_id FROM characters WHERE id = ?", [characterId]);
	let character = characters[0];
	let characterName = character.character_name;

	if (status === "approved" && character.guild_id !== null) {
		characterAlreadyAtGuildError();
	}
	let [users] = await pool.query("SELECT email FROM users WHERE id = ?", [character.user_id]);
	let userMail = users[0].email;
	let [guilds] = await pool.query("SELECT name FROM guilds WHERE id = ?", [guildId]);
	let guildName = guilds[0].name;

	await pool.query(`UPDATE join_requests SET status = ? WHERE id = ?`, [status, joinReqId]);

	if (status === "approved") {
		await pool.query(`UPDATE characters SET guild_id = ? WHERE id = ?`, [guildId, characterId]);
	}

	return { characterName, guildName, userMail, status };
};

export default manageGuildRequest;
