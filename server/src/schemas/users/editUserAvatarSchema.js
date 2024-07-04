import joi from "joi";

// Importamos el esquema que verifica una imagen.
import imgSchema from "../imgSchema.js";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi.
const editUserAvatarSchema = joi.object({
  avatar: imgSchema.required().messages(joiErrorMessages),
});

export default editUserAvatarSchema;
