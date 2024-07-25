import { secondaryGuildNotFoundError } from "../services/errorService.js";
import { selectGuildByIdModel } from "../models/guilds/index.js";

const guildExistsController = async (req, res, next) => {
	try {
		const { guildId } = req.params;
		const guild = await selectGuildByIdModel(guildId);

		if (!guild || guild.length < 0) {
			secondaryGuildNotFoundError();
		}

		next();
	} catch (err) {
		next(err);
	}
};

export default guildExistsController;
