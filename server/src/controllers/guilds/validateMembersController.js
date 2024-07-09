import sendMailUtil from "../../utils/sendEmailUtil.js";
import { selectJoinReqByIdModel, insertMemberModel } from "../../models/guilds/index.js";

const validateMembersController = async (req, res, next) => {
	try {
		const joinReqId = req.params.joinReqId;

		const request = await selectJoinReqByIdModel(joinReqId);

		const characterId = request.character_id;
		const guildId = request.guild_id;

		const { characterName, guildName, userMail, reqStatus } = await insertMemberModel(characterId, guildId);

		const emailSubject = "Solicitud de union a la hermandad";
		const emailBody = `
    ¡Estimad@ ${characterName}!

    Su solicitud de union para la hermandad ${guildName} ha sido ${reqStatus} 
    
    Si necesitas mas informacion puedes contactar con el admistrador de la hermandad.

   `;

		// ya guardado el user en base de datos, enviamos correo con el registtrationCode
		await sendMailUtil(userMail, emailSubject, emailBody);

		// una vez enviado el correo con el codigo de registro mandamos respuesta al cliente
		res.send({
			status: "ok",
			message: "Usuario creado correctamente, por favor revisa tu correo ...",
			data: { characterName, guildName, user, reqStatus },
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export default validateMembersController;