import { selectGuildByIdModel } from "../../models/guilds/index.js";
import { notAuthorizedError } from "../../services/errorService.js";
import { editGuildModel } from "../../models/guilds/index.js";
import { deleteFile, saveFile } from "../../services/fileServices.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import { guildSchema } from "../../schemas/guilds/index.js";

const editGuildController = async (req, res, next) => {
	try {
		await validateSchema(guildSchema, req.body, req.files);
		let { name, description } = req.body;

		console.log("Guild Name", name);
		const userId = String(req.user?.id);
		console.log("User ID:", userId);
		const guildId = req.params.guildId;
		const guildArray = await selectGuildByIdModel(guildId);

		if (guildArray.length === 0) {
			return res.status(404).send({
				status: "error",
				message: "Hermandad no encontrada",
			});
		}
		const guild = guildArray[0];
		if (userId !== String(guild.owner_id)) {
			return notAuthorizedError();
		}
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
