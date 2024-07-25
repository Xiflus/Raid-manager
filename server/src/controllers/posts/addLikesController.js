import { addLikesModel } from "../../models/posts/index.js";
import addLikesSchema from "../../schemas/posts/addLikeSchema.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";

const addLikesController = async (req, res, next) => {
	try {
		await validateSchema(addLikesSchema, req.body);
		const { value } = req.body;
		const characterId = req.session.characterId;
		console.log(characterId);
		const postId = req.params;
		await addLikesModel(value, characterId, postId);
		res.status(200).send({
			status: "ok",
			message: "+1",
		});
	} catch (error) {
		next(error);
	}
};

export default addLikesController;
