import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const validateUserSchema = joi.object({
  registrationCode: joi.string().required().messages(joiErrorMessages),
});

export default validateUserSchema;