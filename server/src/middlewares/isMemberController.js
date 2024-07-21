import { characterIsNotMemberError } from "../services/errorService.js";
import { getUserCharacterListModel } from "../models/characters/index.js";

const isMemberController = async (req, res, next) => {
	const userId = req.user.id;
	const guildId = req.params.guildId;
	try {
		const characters = await getUserCharacterListModel(userId);
		const character = characters.find((char) => char.guild_id === guildId);
		if (!character) {
			return characterIsNotMemberError();
		}
		next();
	} catch (err) {
		next(err);
	}
};

export default isMemberController;
