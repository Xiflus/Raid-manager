import uuid4 from "uuid4";
import { insertFileModel, insertPostModel } from "../../models/guilds/index.js";
import { saveFile } from "../../services/fileServices.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";
import newPostSchema from "../../schemas/posts/newPostSchema.js";

//funcion controladora que añade entrada
const newPostController = async (req, res, next) => {
	try {
		// await validateSchema(newPostSchema, object.assign(req.body, req.file));
		//obtenemos body
		const { title, content, characterId } = req.body;
		const entryId = uuid4();

		//insertamos el post y obtenemos el ID del post
		const postId = await insertPostModel(entryId, title, content, req.character?.id || characterId);

		//preparamos para posible multimedia
		let files = [];

		//sireq.files existe, hay archivos
		if (req.files) {
			const filesArray = Object.values(req.files).slice(0, 3);

			for (const file of filesArray) {
				const fileName = await saveFile(file);

				const fileId = await insertFileModel(fileName, postId);

				//pusheamos los archivos
				file.push({ id: fileId, name: fileName });
			}
		}

		res.status(201).send({
			status: "ok",
			message: "Post creado",
			data: {
				entry: {
					id: postId,
					title,
					content,
					files,
					characterId: req.character?.id,
				},
			},
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};
export default newPostController;
