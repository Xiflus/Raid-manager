import getUserCharacterListModel from "../models/characters/getUserCharacterListModel.js";
import { notStaffError } from "../services/errorService.js";

const isStaffController = async (req, res, next) => {
	const userId = req.user.id;
	const guildId = req.params.guildId;
	try {
		const characters = await getUserCharacterListModel(userId);
		const character = characters.find((char) => char.guild_id === guildId);
		if (!character || character.role !== "staff") {
			return notStaffError();
		}
		next();
	} catch (err) {
		next(err);
	}
};

export default isStaffController;
