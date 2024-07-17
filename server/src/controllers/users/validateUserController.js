import { updateActiveUserModel } from "../../models/users/index.js";
import {validateUserSchema} from "../../schemas/users/index.js"
import validateSchema from "../../utils/validateSchema.js";
// Función controladora final que valida a un usuario recién registrado.
const validateUserController = async (req, res, next) => {
  try {
    // Obtenemos el código de registro.
    await validateSchema(validateUserSchema, req.params);
    const { registrationCode } = req.params;

    // Activamos el usuario.
    await updateActiveUserModel(registrationCode);

    res.send({
      status: "ok",
      message: "Usuario activado",
    });
  } catch (err) {
    next(err);
  }
};

export default validateUserController;
