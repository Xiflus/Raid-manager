import randomstring from "randomstring";
import { recoverPasswordModel } from "../../models/users/index.js";
import sendEmailUtil from "../../utils/sendEmailUtil.js";

const passwordRecoverController = async (req, res, next) => {
	try {
		const { email } = req.body;
		const recoverPassCode = randomstring.generate(10);
		await recoverPasswordModel(email, recoverPassCode);
		const emailSubject = "Recuperación de contraseña en Diario de Viajes :)";

		const emailBody = `
    Se ha solicitado la recuperación de contraseña para este email en Diaro de Viajes. 
              
    Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

    Si no has sido tú ignora este email.
  `;
		await sendEmailUtil(email, emailSubject, emailBody);
		res.send({ status: "ok", message: "Email de recuperación de contraseña enviado" });
	} catch (err) {
		next(err);
	}
};

export default passwordRecoverController;
