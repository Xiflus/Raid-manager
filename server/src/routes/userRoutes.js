import express from "express";
import loginUserController from "../controllers/users/loginUserController.js";

const router = express.Router();

router.post("/api/users/login", loginUserController);

/* router.post("/api/users/characters", characterController); */

export default router;
