import { Router } from "express";
import * as taskController from "../controllers/task";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Use the authenticateToken middleware for routes that require authentication
router.use(authenticateToken);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
