import bcrypt from "bcrypt";
import {updatePasswordModel, selectUserbyIdModel} from "../../models/users/index.js";
import { invalidCredentialsError } from "../../services/errorService.js";
import validateSchema from "../../utils/validateSchema.js";
import { editPasswordSchema } from "../../schemas/users/index.js";

const editPasswordController = async (req, res, next) => {
	try {
		await validateSchema(editPasswordSchema, req.body);

		let { currentPassword, newPassword } = req.body;
		const userId = req.user.id;
		const user = await selectUserbyIdModel(userId);
		let validPass;
		if (user) {
			validPass = await bcrypt.compare(currentPassword, user.password);
		}
		if (!user || !validPass) {
			invalidCredentialsError();
		}

		await updatePasswordModel(userId, newPassword);

		res.status(201).send({
			status: "ok",
			data: {
				message: "Contraseña modificada correctamente",
			},
		});
	} catch (err) {
		next(err);
	}
};

export default editPasswordController;
