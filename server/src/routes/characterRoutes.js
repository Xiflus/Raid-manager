import express from "express";
import { authUserController } from "../middlewares/index.js";
import { createCharacterController, getUserCharacterListController, selectUserCharacterController } from "../controllers/characters/index.js";

const router = express.Router();

router.post("/api/select-character", authUserController, selectUserCharacterController);

router.post("/api/characters", authUserController, createCharacterController);

router.get("/api/characters", authUserController, getUserCharacterListController);

export default router;
