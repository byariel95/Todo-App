import express from "express";
import { taskController } from "../controllers/task.controller";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/get-all-task/", authenticateToken, taskController.getAllTasks);
router.post("/add-task", authenticateToken, taskController.addTask);
router.get("/search-tasks", authenticateToken, taskController.searchTask);
router.put("/edit-task/:taskId", authenticateToken, taskController.editTask);
router.delete("/delete-task/:taskId", authenticateToken, taskController.deleteTask);
router.put("/update-task-completed/:taskId", authenticateToken, taskController.updateTaskCompleted);



export const TaskRoutes = router;