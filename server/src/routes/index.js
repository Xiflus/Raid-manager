import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use(userRoutes);

export default router;
