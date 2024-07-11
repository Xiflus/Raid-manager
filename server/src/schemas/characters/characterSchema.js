import joi from "joi";
import imgSchema from "../imgSchema.js";
import joiErrorMessages from "../joiErrorMessages.js";

const GuildSchema = joi.object({
	characterName: joi.string().required().min(2).max(12).messages(joiErrorMessages),
	characterClass: joi.string().min(4).max(20).required().messages(joiErrorMessages),
	avatar: imgSchema.optional(),
});
export default GuildSchema;
