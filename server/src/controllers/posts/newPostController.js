import uuid4 from "uuid4";
import { insertFileModel } from "../../models/guilds/index.js";
import { insertPostModel } from "../../models/posts/index.js";
import { saveFile } from "../../services/fileServices.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import newPostSchema from "../../schemas/posts/newPostSchema.js";
import { selectUserCharacterModel } from "../../models/characters/index.js";

//funcion controladora que añade entrada
const newPostController = async (req, res, next) => {
	try {
		await validateSchema(newPostSchema, Object.assign(req.body, req.file));
		//obtenemos body
		const { title, content } = req.body;
		const characterId = req.session.characterId;
		console.log("datos de session", req.session);
		const userId = req.user.id;
		const entryId = uuid4();
		const postId = await insertPostModel(entryId, title, content, characterId);
		const character = await selectUserCharacterModel(userId, characterId);

		console.log("Personaje", character);

		//preparamos para posible multimedia
		let files = [];

		//si req.files existe, hay archivos
		if (req.files) {
			const filesArray = Object.values(req.files).slice(0, 3);

			for (const file of filesArray) {
				const fileName = await saveFile(file, 150);

				const fileId = await insertFileModel(fileName, entryId);

				//pusheamos los archivos
				files.push({ id: fileId, name: fileName });
			}
		}

		res.status(201).send({
			status: "ok",
			message: "Post creado",
			data: {
				post: {
					id: postId,
					title,
					content,
					files,
				},
			},
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};
export default newPostController;
