import joi from "joi";
import imgSchema from "../imgSchema.js";
import joiErrorMessages from "../joiErrorMessages.js";

const editUserSchema = joi.object({
  username: joi.string().min(5).max(30).optional().messages(joiErrorMessages),
  photo1: imgSchema.optional(),
});

export default editUserSchema;
