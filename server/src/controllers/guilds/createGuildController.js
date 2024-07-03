import insertGuildModel from "../../models/guilds/insertGuildModel.js";
const createGuildController = async (req, res, next) => {
  try {
    //validamos los datos con joi
    //await validateSchema(newGuilSchema, req.body)
    const { name, avatar, description, userId } = req.body;
    // const userId = req.user.id;
    await insertGuildModel(name, avatar, description, userId);
    res.status(201).send({
      status: "ok",
      data: { message: "Hermandad creada correctamente" },
    });
  } catch (err) {
    next(err);
  }
};

export default createGuildController;
