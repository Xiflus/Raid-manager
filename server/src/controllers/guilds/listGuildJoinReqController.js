import { selectAllJoinRequestsModel } from "../../models/guilds/index.js";

const listGuildJoinReqController = async (req, res, next) => {
	try {
		const guildId = req.params.guildId;

		const requests = await selectAllJoinRequestsModel(guildId);
		res.send({
			status: "ok",
			data: {
				requests,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default listGuildJoinReqController;
