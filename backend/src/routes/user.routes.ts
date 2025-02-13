import express from "express";
import { userController } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth";
const router = express.Router();

router.post("/create-account", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/get-user", authenticateToken, userController.getUser);

export const UserRoutes = router;