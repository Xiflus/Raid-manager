import express from "express";
import {
	guildListController,
	joinGuildController,
	createGuildController,
	unsubscribeFromGuildController,
	newPostController,
	getGuildController,
	postsListController,
	getPostController,
} from "../controllers/guilds/index.js";
import { authUserController } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/guilds", authUserController, createGuildController);

router.get("/api/guilds", authUserController, guildListController);

router.get("/api/guilds/:guildId", authUserController, getGuildController);

router.delete("/api/guilds/:guildId", authUserController, unsubscribeFromGuildController);

router.post("/api/guilds/join", authUserController, joinGuildController);

router.post("/api/guilds/posts", authUserController, newPostController);

router.get("/api/guilds/:guildId/posts", authUserController, postsListController);

router.get("/api/guilds/:guildId/posts/:postId", authUserController, getPostController);

export default router;
