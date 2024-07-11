import express from "express";
import userRoutes from "./userRoutes.js";
import guildRoutes from "./guildRoutes.js";
import characterRoutes from "./characterRoutes.js";

const router = express.Router();

router.use(guildRoutes);
router.use(userRoutes);
router.use(characterRoutes);

export default router;
