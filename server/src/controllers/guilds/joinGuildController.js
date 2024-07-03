import uuid4 from "uuid4";
import selectCharacterByIdModel from "../../models/guilds/selectCharacterByIdModel.js";
import selectGuildByIdModel from "../../models/guilds/selectGuildByIdModel.js";
import joinRequestModel from "../../models/guilds/joinRequestModel.js";
import { requiredFieldsError, characterNotFoundError } from "../../services/errorService.js";

const joinGuildController = async (req, res, next) => {
	const { guildName, characterName } = req.body;
	if (!characterName || !guildName) {
		return requiredFieldsError();
	}
	try {
		const characters = await selectCharacterByIdModel(characterName);
		const guilds = await selectGuildByIdModel(guildName);

		if (!characters || characters.length === 0) {
			// characterNotFoundError(characterName);
			throw new Error(`Character ${characterName} not found`);
		}

		if (!guilds || guilds.length === 0) {
			// guildNotFoundError(guildName);
			throw new Error(`Guild ${guildName} not found`);
		}

		const character = characters[0];
		const guild = guilds[0];

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
