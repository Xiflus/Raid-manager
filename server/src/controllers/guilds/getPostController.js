import { selectPostByIdModel } from "../../models/guilds/index.js";
import { getPostSchema } from "../../schemas/guilds/index.js";
import validateSchema from "../../utils/validateSchema.js";
// Función controladora final que retorna el listado de entradas.
const getPostController = async (req, res, next) => {
    try {
        await validateSchema(getPostSchema, req.params);
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
