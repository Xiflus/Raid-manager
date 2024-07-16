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
      user.avatar && (await deleteFile(user.avatar));
      const file = req.files.avatar;
      avatar = await saveFile(file, 150);
    }

    await updateUserModel(username, avatar, userId);
    res.send({
      status: "ok",
      message: "Usuario actualizado",
      data: {
        user: {
          username,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default editUserController;
