import getUserCharacterListModel from "../models/characters/getUserCharacterListModel.js";
import { notStaffError } from "../services/errorService.js";

const isStaff = async (req, res, next) => {
	const userId = req.user.id;
	const guildId = req.params.guildId;
	try {
		const characters = await getUserCharacterListModel(userId);
		console.log(characters);
	} catch (err) {
		next(err);
	}

	notStaffError();
};

export default isStaff;
