import { authMiddleware } from "../middleware/auth.middleware.js";
import { loginUser, changeCurrentPassword, createUser, getCurrentUser, logoutUser, refreshAccessToken } from "../controller/user.controller.js";
import { Router } from "express";
const router = Router()


router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/getCurrentUser").get(authMiddleware, getCurrentUser)
router.route("/logout").post(authMiddleware, logoutUser)
router.route("/refreshToken").patch(authMiddleware, refreshAccessToken);
router.route("/changePassword").patch(authMiddleware, changeCurrentPassword);
router.route("/me").get(authMiddleware, getCurrentUser);

export default router