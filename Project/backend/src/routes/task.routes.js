import { getTasks, createTask, deleteTask, getTask, updateTask } from "../controller/task.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { Router } from "express";
const router = Router()


router.route("/").post(authMiddleware, createTask)
router.route("/").get(authMiddleware, getTasks)
router.route("/:id").get(authMiddleware, getTask)
router.route("/:id").patch(authMiddleware, updateTask)
router.route("/:id").delete(authMiddleware, deleteTask)


export default router