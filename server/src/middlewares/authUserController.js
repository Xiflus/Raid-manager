import jwt from "jsonwebtoken";
import { SECRET } from "../../env.js";
import { notAuthenticatedError, invalidTokenError } from "../services/errorService.js";
debugger;
const authUserController = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			notAuthenticatedError();
		}
		let tokenInfo;

		try {
			tokenInfo = jwt.verify(authorization, SECRET);
			req.user = tokenInfo;
			next();
		} catch (err) {
			console.log(err);
			invalidTokenError();
		}
	} catch (err) {
		next(err);
	}
};

export default authUserController;
