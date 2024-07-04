import uuid4 from "uuid4";
import { selectCharacterByIdModel, selectGuildByIdModel, joinRequestModel } from "../../models/guilds/index.js";
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
			characterNotFoundError(characterName);
		}

		if (!guilds || guilds.length === 0) {
			guildNotFoundError(guildName);
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
