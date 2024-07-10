import uuid4 from "uuid4";
import { selectCharacterByIdModel, selectGuildByIdModel, joinRequestModel } from "../../models/guilds/index.js";
import { requiredFieldsError, characterNotFoundError, guildNotFoundError } from "../../services/errorService.js";

const joinGuildController = async (req, res, next) => {
	const { characterName } = req.body;
	const guildId = req.params.guildId;
	if (!characterName || !guildId) {
		return requiredFieldsError();
	}
	try {
		const characters = await selectCharacterByIdModel(characterName);
		const guilds = await selectGuildByIdModel(guildId);

		if (!characters || characters.length === 0) {
			characterNotFoundError(characterName);
		}

		if (!guilds || guilds.length === 0) {
			guildNotFoundError(guildId);
		}

		const character = characters[0];
		const guild = guilds[0];
		/* console.log("character",character)
		console.log("guild",guild) */
		const requestId = uuid4();

		await joinRequestModel(requestId, character.id, guild.id);
		res.send({
			status: "ok",
			data: {
				message: "solicitud para unión a guild enviada",
			},
		});
	} catch (err) {
		next(err);
	}
};

export default joinGuildController;
