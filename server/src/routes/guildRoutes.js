import express from "express";
import {
	guildListController,
	joinGuildController,
	createGuildController,
	unsubscribeFromGuildController,
	newPostController,
} from "../controllers/guilds/index.js";
import { authUserController } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/guilds", authUserController, createGuildController);

router.get("/api/guilds", authUserController, guildListController);

router.post("/api/guilds/join", authUserController, joinGuildController);

router.post("/api/guilds/posts", authUserController, newPostController);

router.delete("/api/guilds/:characterId", authUserController, unsubscribeFromGuildController);

export default router;
