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
	validateMembersController,
	editGuildController,
	listGuildJoinReqController,
} from "../controllers/guilds/index.js";
import { authUserController, isStaffController } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/guilds", authUserController, createGuildController);

router.get("/api/guilds", authUserController, guildListController);

router.put("/api/guilds/:guildId", authUserController, isStaffController, editGuildController);

router.get("/api/guilds/:guildId", authUserController, getGuildController);

router.delete("/api/guilds/:guildId", authUserController, unsubscribeFromGuildController);

router.post("/api/guilds/:guildId/join", authUserController, joinGuildController);

router.post("/api/guilds/posts", authUserController, newPostController);

router.get("/api/guilds/:guildId/posts", authUserController, postsListController);

router.get("/api/guilds/:guildId/posts/:postId", authUserController, getPostController);

router.put("/api/guilds/:guildId/:joinReqId", authUserController, validateMembersController);

router.get("/api/guilds/:guildId/join-req", authUserController, isStaffController, listGuildJoinReqController);

export default router;
