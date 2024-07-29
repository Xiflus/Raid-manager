import { addLikesModel } from "../../models/posts/index.js";
import addLikesSchema from "../../schemas/posts/addLikeSchema.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";

const addLikesController = async (req, res, next) => {
	try {
		const { value } = req.body;
		const characterId = req.session.characterId;
		const postId = req.params.postId;
		const validData = { value };
		console.log("request body:", validData);
		await validateSchema(addLikesSchema, validData);

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
