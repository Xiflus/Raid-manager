import { getUserCharacterListModel } from "../../models/characters/index.js";

const getUserCharacterController = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const characters = await getUserCharacterListModel(userId);
		res.send({
			status: "ok",
			data: {
				characters,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default getUserCharacterController;
