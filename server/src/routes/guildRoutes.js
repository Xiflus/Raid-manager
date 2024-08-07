import express from "express";
import {
	guildListController,
	joinGuildController,
	createGuildController,
	unsubscribeFromGuildController,
	getGuildController,
	validateMembersController,
	editGuildController,
	listGuildJoinReqController,
} from "../controllers/guilds/index.js";
import {
	authUserController,
	isStaffController,
	isMemberController,
	authUserOptionalController,
	guildExistsController,
} from "../middlewares/index.js";

const router = express.Router();

router.post("/api/guilds", authUserController, createGuildController);

router.get("/api/guilds", authUserOptionalController, guildListController);

router.put("/api/guilds/:guildId", authUserController, guildExistsController, isStaffController, editGuildController);

router.get("/api/guilds/:guildId", authUserOptionalController, guildExistsController, getGuildController);

router.delete("/api/guilds/:guildId", authUserController, guildExistsController, isStaffController, unsubscribeFromGuildController);

// router.delete("/api/guilds/:guildId/leave", authUserController, guildExistsController, isMemberController, leaveGuildController);

router.post("/api/guilds/:guildId/join", authUserController, guildExistsController, joinGuildController);

router.get("/api/guilds/:guildId/join-req", authUserController, guildExistsController, listGuildJoinReqController);

router.put("/api/guilds/:guildId/join-req/:joinReqId", authUserController, guildExistsController, validateMembersController);

export default router;
