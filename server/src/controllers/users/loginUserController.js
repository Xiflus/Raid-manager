import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError, pendingActivationError } from "../../services/errorService.js";

//Modelos
import selectUserModel from "../../models/users/selectUserModel.js";

//FALTA schema de validación
//schema de joi

import { SECRET } from "../../../env.js";

const loginUserController = async (req, res, next) => {
	try {
		//FALTA SCHEMA VALIDATE

		const { username, password } = req.body;

		const user = await selectUserModel(username);

		let validpass;

		if (user) {
			validpass = await bcrypt.compare(password, user.password);
		}

		if (!user || !validpass) {
			invalidCredentialsError();
		}

		if (!user.active) {
			pendingActivationError();
		}

		const tokenInfo = {
			id: user.id,
			role: user.role,
		};

		const token = jwt.sign(tokenInfo, SECRET, { expiresIn: "7d" });

		res.status(201).send({
			status: "ok",
			data: {
				token,
			},
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};
export default loginUserController;
