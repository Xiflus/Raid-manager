import { selectCharacterByIdModel, selectGuildByIdModel, deleteFromGuildModel } from "../../models/guilds/index.js";
import { requiredFieldsError, characterNotFoundError, guildNotFoundError } from "../../services/errorService.js";
import { unsubscribeFromGuildSchema } from "../../schemas/guilds/index.js";
import validateSchema from "../../utils/validateSchema.js";

const unsubscribeFromGuildController = async (req, res, next) => {
	await validateSchema(unsubscribeFromGuildSchema, req.body);
	const guildId = req.params.guildId;
	const { characterName } = req.body;
	if (!characterName) {
		return requiredFieldsError();
	}
	try {
		const characters = await selectCharacterByIdModel(characterName);
		const guilds = await selectGuildByIdModel(guildId);
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
