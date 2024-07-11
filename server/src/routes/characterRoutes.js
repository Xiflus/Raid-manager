import express from "express";
import { authUserController } from "../middlewares/index.js";
import { createCharacterController } from "../controllers/characters/index.js";

const router = express.Router();

router.post("/api/characters", authUserController, createCharacterController);

export default router;
