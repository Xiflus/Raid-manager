import { insertGuildModel, insertGuildMasterModel } from "../../models/guilds/index.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import { guildSchema } from "../../schemas/guilds/index.js";
import { saveFile } from "../../services/fileServices.js";
import { getUserCharacterListModel } from "../../models/characters/index.js";

const createGuildController = async (req, res, next) => {
	try {
		await validateSchema(guildSchema, req.body, req.files);
		let { name, description, characterName } = req.body;
		const userId = req.user.id;

		const characters = await getUserCharacterListModel(userId);

		const character = characters.find((char) => char.character_name === characterName);

		if (!character) {
			return res.status(404).send({
				status: "error",
				message: "El personaje proporcionado no existe",
			});
		}

		let avatar;
		if (req.files) {
			const file = req.files.avatar;
			avatar = await saveFile(file, 150);
		}

		const guildId = await insertGuildModel(name, avatar, description, userId);

		await insertGuildMasterModel(guildId, characterName, userId);
		res.status(201).send({
			status: "ok",
			data: { message: "Hermandad creada correctamente" },
		});
	} catch (err) {
		next(err);
	}
};

export default createGuildController;
