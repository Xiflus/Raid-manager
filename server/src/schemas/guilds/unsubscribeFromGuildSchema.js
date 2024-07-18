import Joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const unsubscribeFromGuildSchema = Joi.object({
  guildName: Joi.string().required().messages(joiErrorMessages),
  characterName: Joi.string().required().messages(joiErrorMessages),
});

export default unsubscribeFromGuildSchema;