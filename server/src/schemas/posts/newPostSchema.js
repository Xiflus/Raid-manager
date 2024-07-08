import joi from "joi";
import imgSchema from "../imgSchema.js";
import joiErrorMessages from "../joiErrorMessages.js";

const newPostSchema = joi.object({
  content: joi.string().min(10).max(500).required().messages(joiErrorMessages),
  photo1: imgSchema.optional(),
  photo2: imgSchema.optional(),
  entryId: joi.string().required(),
  title: joi.string().required(),
  content: joi.string().required(),
  characterId: joi.string().required()
});
export default newPostSchema;
