import { selectPostByIdModel } from "../../models/guilds/index.js";
// Función controladora final que retorna el listado de entradas.
const getPostController = async (req, res, next) => {
	try {
		// Obtenemos el id de la entrada.
		const { postId } = req.params;

		// Obtenemos la entrada. Es importante indicarle a JavaScript que la propiedad
		// "user" podría ser undefined.
		const post = await selectPostByIdModel(postId, req.character?.id);

		res.send({
			status: "ok",
			data: {
				post,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default getPostController;
