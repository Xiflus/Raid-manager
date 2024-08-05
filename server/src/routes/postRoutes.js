import express from "express";
import { newPostController, postsListController, getPostController, addLikesController } from "../controllers/posts/index.js";
import { authUserController, isMemberController, guildExistsController } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/guilds/:guildId/posts", authUserController, guildExistsController, isMemberController, newPostController);

router.get("/api/guilds/:guildId/posts", authUserController, guildExistsController, postsListController);

router.get("/api/guilds/:guildId/posts/:postId", authUserController, guildExistsController, isMemberController, getPostController);

router.post("/api/guilds/:guildId/posts/:postId/likes", authUserController, guildExistsController, isMemberController, addLikesController);

export default router;
