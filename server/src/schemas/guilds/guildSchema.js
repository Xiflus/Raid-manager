import joi from "joi";
import imgSchema from "../imgSchema.js";
import joiErrorMessages from "../joiErrorMessages.js";

const GuildSchema = joi.object({
	name: joi.string().required(),
	description: joi.string().min(10).max(500).optional().messages(joiErrorMessages),
	characterName: joi.string().required(),
	photo1: imgSchema.optional(),
});
export default GuildSchema;
