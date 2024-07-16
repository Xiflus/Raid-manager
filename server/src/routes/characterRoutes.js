import express from "express";
import { authUserController } from "../middlewares/index.js";
import { createCharacterController, getUserCharacterController } from "../controllers/characters/index.js";

const router = express.Router();

router.post("/api/characters", authUserController, createCharacterController);

router.get("/api/characters", authUserController, getUserCharacterController);

export default router;
