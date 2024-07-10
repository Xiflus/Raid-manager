import joi from "joi";
import imgSchema from "../imgSchema.js";
import joiErrorMessages from "../joiErrorMessages.js";

const GuildSchema = joi.object({
	name: joi.string().optional(),
	description: joi.string().min(10).max(500).optional().messages(joiErrorMessages),
	photo1: imgSchema.optional(),
});
export default GuildSchema;
