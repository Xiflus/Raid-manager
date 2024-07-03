import joi from "joi";
import joiErrorMessages from "../schemas/joiErrorMessages.js";

const imgSchema = joi
	.object({
		name: joi.string().required().messages(joiErrorMessages),
		mimetype: joi.string().valid("image/png", "image/jpeg", "image/jpg").required().messages(joiErrorMessages),
		size: joi.number().max(5000000).required().messages(joiErrorMessages),
	})
	.unknown(true);
export default imgSchema;
