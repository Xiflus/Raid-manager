import { selectUserCharacterModel } from "../../models/characters/index.js";
import { characterNotFoundError } from "../../services/errorService.js";

const selectUserCharacterController = async (req, res, next) => {
	try {
		const { characterId } = req.body;
		const userId = req.user.id;
		let characters, character, characterName;
		try {
			characters = await selectUserCharacterModel(userId, characterId);
			character = characters[0];
			characterName = character[0].character_name;
		} catch (err) {
			characterNotFoundError(characterId);
		}

		res.status(200).send({
			status: "ok",
			data: {
				message: `Personaje ${characterName} seleccionado`,
				character,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default selectUserCharacterController;
