import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi.
const loginUserSchema = joi.object({
	password: joi.string().required().messages(joiErrorMessages),
	username: joi.string().email().required().messages(joiErrorMessages),
});

export default loginUserSchema;
