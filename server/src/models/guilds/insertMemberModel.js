import getPool from "../../db/getPool.js";
import { characterAlreadyAtGuildError } from "../../services/errorService.js";

const insertMemberModel = async (characterId, guildId, status) => {
	const pool = await getPool();
	// revisar si el usuario ya existe?
	let [characters] = await pool.query("SELECT id, character_name, user_id, guild_id FROM characters WHERE id = ?", [characterId]);
	console.log(status);
	let character = characters[0];
	let characterName = character.character_name;

	if (character.guild_id !== null) {
		characterAlreadyAtGuildError();
	}
	let [users] = await pool.query("SELECT email FROM users WHERE id = ?", [character.user_id]);
	let userMail = users[0].email;
	let [guilds] = await pool.query("SELECT name FROM guilds WHERE id = ?", [guildId]);
	let guildName = guilds[0].name;

	if (status == "accepted") {
		await pool.query(`UPDATE join_requests SET status = ? WHERE character_id = ?`, [status, characterId]);
		await pool.query(`UPDATE characters SET guild_id = ? WHERE id = ?`, [characterId, guildId]);
	}
	if (status == "rejected") {
		await pool.query(`UPDATE join_requests SET status = ? WHERE character_id = ?`, [status, characterId]);
	}

	const [requests] = await pool.query("SELECT status FROM join_requests WHERE character_id = ?", [characterId]);
	const reqStatus = requests[0].status;
	return { characterName, guildName, userMail, reqStatus };
};

export default insertMemberModel;
