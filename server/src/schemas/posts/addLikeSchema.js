import joi from "joi";
import joiErrorMessages from "../joiErrorMessages.js";

const addLikeSchema = joi.object({
	value: joi.number().precision(2).min(1).max(5).required().messages(joiErrorMessages),
});

export default addLikeSchema;
