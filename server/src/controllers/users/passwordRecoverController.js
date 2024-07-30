import randomstring from "randomstring";
import { recoverPasswordModel } from "../../models/users/index.js";
import sendEmailUtil from "../../utils/sendEmailUtil.js";
import { recoverPasswordSchema } from "../../schemas/users/index.js";
import validateSchema from "../../utils/validateSchema.js";

const passwordRecoverController = async (req, res, next) => {
	try {
		await validateSchema(recoverPasswordSchema, req.body);
		const { email } = req.body;
		const recoverPassCode = randomstring.generate(10);

		const emailSubject = "Recuperación de contraseña en Raid manager :)";

		const emailBody = `
    Se ha solicitado la recuperación de contraseña para este email en Raid manager. 
              
    <a href="http://localhost:3000/change-password/${recoverPassCode}">Recuperar contraseña</a>

    Si no has sido tú ignora este email.
  `;

		await sendEmailUtil(email, emailSubject, emailBody);
		await recoverPasswordModel(email, recoverPassCode);

		res.send({ status: "ok", message: "Email de recuperación de contraseña enviado" });
	} catch (err) {
		next(err);
	}
};

export default passwordRecoverController;
