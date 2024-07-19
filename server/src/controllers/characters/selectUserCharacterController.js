import { selectUserCharacterModel } from "../../models/characters/index.js";
import { characterNotFoundError } from "../../services/errorService.js";

const selectUserCharacterController = async (req, res, next) => {
	try {
		const characterId = req.body.characterId;
		const userId = req.user.id;
		const characters = await selectUserCharacterModel(userId, characterId);
		const character = characters[0];
		const characterName = character[0].character_name;
		if (characters.length > 0) {
			req.session.characterId = characterId;
			res.status(200).send({
				status: "ok",
				data: {
					message: `Personaje ${characterName} seleccionado`,
					character,
				},
			});
		} else {
			characterNotFoundError(characterName);
		}
	} catch (err) {
		next(err);
	}
};

export default selectUserCharacterController;
