import express from "express";
import userRoutes from "./userRoutes.js";
import guildRoutes from "./guildRoutes.js";

const router = express.Router();

router.use(guildRoutes);
router.use(userRoutes);

export default router;
