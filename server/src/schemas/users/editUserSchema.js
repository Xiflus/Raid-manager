import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi.
const editUserSchema = joi.object({
    username: joi.string().min(5).max(30).optional().messages(joiErrorMessages),
    email: joi.string().email().optional().messages(joiErrorMessages),
});

export default editUserSchema;
