import express from "express";
import { guildListController, joinGuildController } from "../controllers/guilds/index.js";


const router = express.Router();

/* router.post("/api/guilds", createGuildController); */

router.get("/api/guilds", guildListController);

router.post("/api/guilds/join", joinGuildController);

export default router;
