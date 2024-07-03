import express from "express";
import {
  guildListController,
  joinGuildController,
  createGuildController,
  unsubscribeFromGuildController,
  newPostController
} from "../controllers/guilds/index.js";

const router = express.Router();

router.post("/api/guilds", createGuildController);

router.get("/api/guilds", guildListController);

router.post("/api/guilds/join", joinGuildController);

router.post("/api/guilds/posts", newPostController);

router.delete("/api/guilds/:characterId", unsubscribeFromGuildController);

export default router;
