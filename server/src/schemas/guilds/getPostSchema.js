import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const getPostSchema = joi.object({
  postId: joi.string().guid({ version: 'uuidv4' }).required().messages(joiErrorMessages),
});

export default getPostSchema;