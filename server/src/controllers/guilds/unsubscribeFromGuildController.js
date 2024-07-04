import { selectCharacterByIdModel, selectGuildByIdModel, deleteFromGuildModel } from "../../models/guilds/index.js";
import { requiredFieldsError, characterNotFoundError, guildNotFoundError } from "../../services/errorService.js";

const unsubscribeFromGuildController = async (req, res, next) => {
	const { guildName, characterName } = req.body;
	if (!guildName || !characterName) {
		return requiredFieldsError();
	}
	try {
		const characters = await selectCharacterByIdModel(characterName);
		const guilds = await selectGuildByIdModel(guildName);
		if (!characters || characters.length === 0) {
			characterNotFoundError();
		}
		if (!guilds || guilds.length === 0) {
			guildNotFoundError();
		}
		const character = characters[0];
		const guild = guilds[0];

		await deleteFromGuildModel(character.id, guild.id);
		res.send({
			status: "ok",
			data: {
				message: "Eliminado de la hermandad correctamente.",
			},
		});
	} catch (err) {
		next(err);
	}
};

export default unsubscribeFromGuildController;
