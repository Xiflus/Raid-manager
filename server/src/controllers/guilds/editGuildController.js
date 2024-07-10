import { selectGuildByIdModel } from "../../models/guilds/index.js";
import { notAuthorizedError } from "../../services/errorService.js";
import { editGuildModel } from "../../models/guilds/index.js";
import { deleteFile, saveFile } from "../../services/fileServices.js";

const editGuildController = async (req, res, next) => {
  try {
    await validateSchema(editGuildSchema, Object.assign(req.body, req.files));
    let { name, description } = req.body;
    const userId = req.user?.id;
    const guildId = req.params.guildId;
    const guild = await selectGuildByIdModel(guildId);

    userId !== guild.owner_id && notAuthorizedError();
    name = name === guild.name ? null : name;
    description = description === guild.description ? null : description;

    let fileName;
    if (req.files) {
      guild.avatar && (await deleteFile(guild.avatar));
      const file = req.files;
      const fileName = await saveFile(file, 150);
      return fileName;
    }

    await editGuildModel(guildId, name, description, fileName);

    res.status(201).send({
      status: "ok",
      data: {
        message: "Hermandad modificada correctamente",
      },
    });
  } catch (err) {
    next(err);
  }
};

export default editGuildController;
