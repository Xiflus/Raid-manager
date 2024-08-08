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
		await validateSchema(newPostSchema, req.body);
		//obtenemos body
		const { title, content, characterId } = req.body;
		const guildId = req.params.guildId;
		console.log("newPostController -> guildId", guildId);
		const postId = uuid4();
		await insertPostModel(postId, title, content, characterId, guildId);

		//preparamos para posible multimedia
		let files = [];

		//si req.files existe, hay archivos
		if (req.files && req.files.photos) {
			const filesArray = Array.isArray(req.files.photos) ? req.files.photos : [req.files.photos];

			for (const file of filesArray) {
				const fileName = await saveFile(file, 150);

				const fileId = await insertFileModel(fileName, postId);

				//pusheamos los archivos
				files.push({ id: fileId, name: fileName });
			}
		}

		res.status(201).send({
			status: "ok",
			message: "Post creado",
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};
export default newPostController;
