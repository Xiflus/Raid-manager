import joi from "joi";
import joiErrorMessages from "../joiErrorMessages.js";

const newGuildSchema = joi
	.object({
		name: joi.string().required().messages(joiErrorMessages),
		avatar: joi.string().valid("image/png", "image/jpeg", "image/jpg").messages(joiErrorMessages),
		size: joi.number().max(5000000).messages(joiErrorMessages),
	})
	.unknown(true);
export default newGuildSchema;
