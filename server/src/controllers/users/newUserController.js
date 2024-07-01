import randomstring from "randomstring";
import validateSchema from "../../utils/validateSchema.js";
import newUserSchema from "../../schemas/users/newUserSchema.js";
import sendMailUtil from "../../utils/sendEmailUtil.js";
import * as userModel from "../../models/users/index.js";

//? diarodeviajes.com/api/users/register
const newUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validamos el body con Joi.
    await validateSchema(newUserSchema, req.body);

    // generar el codigo de registro para activar la cuenta
    const registrationCode = randomstring.generate(30);

    // generamos el correo y el cuerpo del correo
    const emailSubject = "Activa tu cuenta de Raid Manager 📝";
    const emailBody = `
    ¡Bienvenid@ ${username}!

    Gracias por registrarte en Raid Manager!
    
    Para activar tu cuenta, haz clic en el siguiente enlace:

    <a href="http://localhost:3000/auth/activate/${registrationCode}">Activar mi cuenta</a>
   `;

    // ya validada, llamamos al modelo para que realice la consulta a la base de datos
    await userModel.insertUser(username, email, password, registrationCode);

    // ya guardado el user en base de datos, enviamos correo con el registtrationCode
    await sendMailUtil(email, emailSubject, emailBody);

    // una vez enviado el correo con el codigo de registro mandamos respuesta al cliente 
    res.send({
      status: "ok",
      message: "Usuario creado correctamente, por favor revisa tu correo ...",
    });
  } catch (err) {
    next(err);
    // console.log(error);
    // res.status(500).send("Error en el servidor al crear user");
  }
};

export default newUserController;
