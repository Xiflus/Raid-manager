import {
    selectUserbyIdModel,
    updateUserModel,
} from "../../models/users/index.js";
import validateSchema from "../../utils/validateSchema.js";
import { editUserSchema } from "../../schemas/users/index.js";
import { deleteFile, saveFile } from "../../services/fileServices.js";

const editUserController = async (req, res, next) => {
    try {
        await validateSchema(editUserSchema, req.body, req.files);

        let { username } = req.body;
        const userId = req.user.id;
        const user = await selectUserbyIdModel(userId);

        username = username === user.username ? null : username;
        let avatar;

        if (req.files) {
            if (user.avatar) {
                await deleteFile(user.avatar);
            }
            const file = req.files.avatar;
            avatar = await saveFile(file, 150);
        }

        await updateUserModel(username, avatar, userId);
        const updatedUser = await selectUserbyIdModel(userId); // Obtener el usuario actualizado para la respuesta
        res.send({
            status: "ok",
            message: "Usuario actualizado",
            data: {
                user: {
                    username: updatedUser.username,
                    avatar: updatedUser.avatar, // Incluir avatar en la respuesta
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserController;
