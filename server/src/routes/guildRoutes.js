import express from "express";
import { guildListController } from "../controllers/guilds/index.js";


const router = express.Router();

router.post("/api/guilds", createGuildController);

router.get("/api/guilds", guildListController);

export default router;
