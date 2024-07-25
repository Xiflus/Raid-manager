import { selectGuildByIdModel } from "../../models/guilds/index.js";
import { notAuthorizedError } from "../../services/errorService.js";
import { editGuildModel } from "../../models/guilds/index.js";
import { deleteFile, saveFile } from "../../services/fileServices.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import { editGuildSchema } from "../../schemas/guilds/index.js";

const editGuildController = async (req, res, next) => {
	try {
		await validateSchema(editGuildSchema, req.body, req.files);
		let { name, description } = req.body;
		const guildId = req.params.guildId;
		const guildArray = await selectGuildByIdModel(guildId);
		const guild = guildArray[0];
		name = name === guild.name ? null : name;
		description = description === guild.description ? null : description;

		let avatar;
		if (req.files) {
			guild.avatar && (await deleteFile(guild.avatar));
			const file = req.files.avatar;
			avatar = await saveFile(file, 150);
		}

		await editGuildModel(guildId, name, description, avatar);

		res.status(201).send({
			status: "ok",
			data: {
				message: "Hermandad modificada correctamente",
			},
		});
	} catch (err) {
		next(err);
	}
};

export default editGuildController;
