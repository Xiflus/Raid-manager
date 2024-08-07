import { addLikesModel } from "../../models/posts/index.js";
import addLikesSchema from "../../schemas/posts/addLikeSchema.js";
import validateSchema from "../../schemas/utilities/validateSchema.js";

const addLikesController = async (req, res, next) => {
	try {
		const { value, characterId } = req.body;
		console.log("addLikesController -> characterId", characterId);

		const postId = req.params.postId;
		const validData = { value };
		await validateSchema(addLikesSchema, validData);

		const { totalLikes, likedByMe } = await addLikesModel(value, characterId, postId);
		res.status(200).send({
			status: "ok",
			message: "+1",
			data: { likes: totalLikes, likedByMe },
		});
	} catch (error) {
		next(error);
	}
};

export default addLikesController;
