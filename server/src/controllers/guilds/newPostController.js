import insertFileModel from "../../models/guilds/insertFileModel";
import insertPostModel from "../../models/guilds/inserPostModel";

import { saveFile } from "../../services/fileServices";

//FALTA VALIDATE SCHEMA!

//FALTA JOI SCHEMA!

//funcion controladora que añade entrada
const newPostController = async (req, res, next) => {
	try {
		await validateSchema(newPostSchema, object.assign(req.body, req.file));
		//obtenemos body
		const { title, content } = req.body;

		//insertamos el post y obtenemos el ID del post
		const postId = await insertPostModel(content, req.user.id);

		//preparamos para posible multimedia
		const file = [];

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
					content,
					files,
					characterId: req.character.id,
					createdAt: new Date(),
				},
			},
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};
export default newPostController;
