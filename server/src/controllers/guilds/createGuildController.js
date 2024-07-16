import { insertGuildModel } from "../../models/guilds/index.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import { guildSchema } from "../../schemas/guilds/index.js";
import { saveFile } from "../../services/fileServices.js";
import { getUserCharacterListModel } from "../../models/characters/index.js";

const createGuildController = async (req, res, next) => {
	try {
		//validamos los datos con joi
		await validateSchema(guildSchema, req.body, req.files);
		let { name, description } = req.body;
		const userId = req.user?.id;

		const characters = await getUserCharacterListModel(userId);
		console.log(characters);

		let avatar;
		if (req.files) {
			const file = req.files.avatar;
			avatar = await saveFile(file, 150);
		}

		await insertGuildModel(name, avatar, description, userId);
		res.status(201).send({
			status: "ok",
			data: { message: "Hermandad creada correctamente" },
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export default createGuildController;
