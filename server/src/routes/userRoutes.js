import express from "express";
import { loginUserController, newUserController } from "../controllers/users/index.js";
// import { authUserController } from "../middlewares/index.js";

const router = express.Router();

router.post("/api/users/login", loginUserController);

// .com/users/register
router.post("/api/users/register", newUserController);

/* router.post("/api/users/characters", authUserController, characterController); */

export default router;
