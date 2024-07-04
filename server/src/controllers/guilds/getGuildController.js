import { selectGuildByIdModel } from "../../models/guilds/index.js";

const getGuildController = async (req, res, next) => {
	try {
		const { guildId } = req.params;
		console.log(req.params);
		const guild = await selectGuildByIdModel(guildId);

		res.send({
			status: "ok",
			data: {
				guild,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default getGuildController;
