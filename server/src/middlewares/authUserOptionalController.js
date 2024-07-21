import jwt from "jsonwebtoken";
import { SECRET } from "../../env.js";
import { invalidTokenError } from "../services/errorService.js";

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// NO lanza error si falta el token.
const authUserOptionalController = async (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (authorization) {
			let tokenInfo;
			try {
				tokenInfo = jwt.verify(authorization, SECRET);
				req.user = tokenInfo;
			} catch (err) {
				console.error(err);
				invalidTokenError();
			}
		}

		next();
	} catch (err) {
		next(err);
	}
};

export default authUserOptionalController;
