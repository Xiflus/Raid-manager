import { resetPasswordModel } from "../../models/users/index.js";
import { resetPasswordSchema } from "../../schemas/users/index.js";
import validateSchema from "../../utils/validateSchema.js";

const resetPasswordController = async (req, res, next) => {
    try {
        const { recoverPassCode } = req.params;
        const { newPassword } = req.body;

        await validateSchema(resetPasswordSchema, { newPassword });

        await resetPasswordModel(recoverPassCode, newPassword);

        res.send({
            status: "ok",
            message: "Contraseña actualizada",
        });
    } catch (err) {
        next(err);
    }
};

export default resetPasswordController;
