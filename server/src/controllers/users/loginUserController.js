import bcrypt from "bcrypt";
import {generateToken} from "../../utils/jwtHandler.js"
import { invalidCredentialsError, pendingActivationError } from "../../services/errorService.js";

//Modelos
import selectUserModel from "../../models/users/selectUserModel.js";
import validateSchema from '../../schemas/utilities/validateSchema.js';
import loginUserSchema from "../../schemas/users/loginUserSchema.js";

//FALTA schema de validación
//schema de joi


const loginUserController = async (req, res, next) => {
	try {
		// Validamos los datos con Joi.
        await validateSchema(loginUserSchema, req.body)

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

		const token = generateToken(user);

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
