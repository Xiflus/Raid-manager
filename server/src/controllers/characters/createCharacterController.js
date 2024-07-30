import { insertCharacterModel } from "../../models/characters/index.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import { characterSchema } from "../../schemas/characters/index.js";
import { saveFile } from "../../services/fileServices.js";

const createCharacterController = async (req, res, next) => {
	try {
		await validateSchema(characterSchema, req.body, req.files);
		let { characterName, characterClass } = req.body;
		// Pasamos el string a minusculas y ponemos la primera letra en mayuscula
		characterName = characterName.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
		characterClass = characterClass.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
		const userId = req.user?.id;
		let avatar;
		if (req.files) {
			const file = req.files.avatar;
			avatar = await saveFile(file, 150);
		}
		const newCharacter = await insertCharacterModel(characterName, characterClass, avatar, userId);
		res.status(201).send({
			status: "ok",
			data: {
				message: "Personaje creado",
				character: newCharacter,
			},
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export default createCharacterController;
