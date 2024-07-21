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
import { authUserController, isStaffController, isMemberController, authUserOptionalController } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/guilds", authUserController, createGuildController);

router.get("/api/guilds", authUserOptionalController, guildListController);

router.put("/api/guilds/:guildId", authUserController, isStaffController, editGuildController);

router.get("/api/guilds/:guildId", authUserOptionalController, getGuildController);

router.delete("/api/guilds/:guildId", authUserController, isStaffController, unsubscribeFromGuildController);

router.post("/api/guilds/:guildId/join", authUserController, joinGuildController);

router.post("/api/guilds/:guildId/posts", authUserController, isMemberController, newPostController);

router.get("/api/guilds/:guildId/posts", authUserController, isMemberController, postsListController);

router.get("/api/guilds/:guildId/posts/:postId", authUserController, isMemberController, getPostController);

router.get("/api/guilds/:guildId/join-req", authUserController, isStaffController, listGuildJoinReqController);

router.put("/api/guilds/:guildId/:joinReqId", authUserController, isStaffController, validateMembersController);

export default router;
