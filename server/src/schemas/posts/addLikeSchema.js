import joi from "joi";
import joiErrorMessages from "../joiErrorMessages.js";

const addLikeSchema = joi.object({
	value: joi.boolean().required().messages(joiErrorMessages),
});

export default addLikeSchema;
