import joi from "joi";
import joiErrorMessages from "../joiErrorMessages.js";

const postsListSchema = joi.object({
  guildId: joi
    .string()
    .guid({ version: "uuidv4" })
    .required()
    .messages(joiErrorMessages),
  title: joi.string().optional().messages(joiErrorMessages),
  content: joi.string().optional().messages(joiErrorMessages),
  file: joi.string().optional().messages(joiErrorMessages),
  page: joi.number().integer().positive().optional().messages(joiErrorMessages),
});

export default postsListSchema;
