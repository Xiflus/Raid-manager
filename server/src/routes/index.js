import express from "express";
import userRoutes from "./userRoutes.js";
import guildRoutes from "./guildRoutes.js";

const router = express.Router();

router.use('guilds',guildRoutes);
router.use('/users',userRoutes);

export default router;
