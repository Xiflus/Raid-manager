import { totalGuildCountModel, selectAllGuildsModel } from "../../models/guilds/index.js";

const guildListController = async (req, res, next) => {
	try {
		let { searchTerm = "", page = 1 } = req.query;
		page = Number(page);
		const limit = 3;
		const offset = (page - 1) * limit;
		const totalGuilds = await totalGuildCountModel();
		const totalPages = Math.ceil(totalGuilds / limit);

		const guilds = await selectAllGuildsModel(searchTerm, limit, offset);
		res.send({
			status: "ok",
			data: {
				guilds,
				totalPages,
				currentPage: page,
				totalGuilds,
				prevPage: page > 1 ? page - 1 : null,
				nextPage: page < totalPages ? page + 1 : null,
			},
		});
	} catch (error) {
		next(error);
	}
};

export default guildListController;
