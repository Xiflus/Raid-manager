import { insertGuildModel } from "../../models/guilds/index.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import newGuildSchema from "../../schemas/guilds/newGuildsSchema.js"

const createGuildController = async (req, res, next) => {
	try {
		//validamos los datos con joi
		await validateSchema(newGuildSchema);
		const { name, description } = req.body;
		const avatar = req.files?.avatar;
		const userId = req.user?.id;

		await insertGuildModel(name, avatar, description, userId);
		res.status(201).send({
			status: "ok",
			data: { message: "Hermandad creada correctamente" },
		});
	} catch (err) {
		next(err);
	}
};

export default createGuildController;
