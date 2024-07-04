import { resetPasswordModel } from "../../models/users/index.js";
const resetPasswordController = async (req, res, next) => {
  try {
    const { email, recoverPassCode, newPassword } = req.body;

    // Validamos el body con Joi.

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
