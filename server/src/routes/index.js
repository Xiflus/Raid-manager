import express from "express";
import userRoutes from "./userRoutes.js";
import guildRoutes from "./guildRoutes.js";
import characterRoutes from "./characterRoutes.js";
import postRoutes from "./postRoutes.js";

const router = express.Router();

router.use(guildRoutes);
router.use(userRoutes);
router.use(characterRoutes);
router.use(postRoutes);

export default router;
