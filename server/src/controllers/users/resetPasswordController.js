import { resetPasswordModel } from "../../models/users/index.js";
import {resetPasswordSchema} from "../../schemas/users/index.js";
import validateSchema from "../../utils/validateSchema.js";
const resetPasswordController = async (req, res, next) => {
	try {

		await validateSchema(resetPasswordSchema, req.body);
		// revisar logica de reseteo de contraseña sin buscar el user a traves del email si no a traves del recoverPassCode
		const { email, recoverPassCode, newPassword } = req.body;

		await resetPasswordModel(email, recoverPassCode, newPassword);

		res.send({
			status: "ok",
			message: "Contraseña actualizada",
		});
	} catch (err) {
		next(err);
	}
};

export default resetPasswordController;
