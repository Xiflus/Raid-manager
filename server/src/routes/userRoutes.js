import express from "express";
import {
	loginUserController,
	newUserController,
	validateUserController,
	passwordRecoverController,
	resetPasswordController,
	editPasswordController,
} from "../controllers/users/index.js";
import { authUserController } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/users/register", newUserController);

router.post("/api/users/login", loginUserController);

router.post("/api/users/password/recover", passwordRecoverController);

router.put("/api/users/validate/:registrationCode", validateUserController);

router.put("/api/users/password/reset", resetPasswordController);

router.put("/api/users/password/change", authUserController, editPasswordController);

/* router.post("/api/users/characters", authUserController, characterController); */

export default router;
