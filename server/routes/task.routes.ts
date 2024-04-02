import express from "express";
import auth from "../middlewares/auth.middlewares";
import {
  createNewTask,
  updateTask,
  deleteTaskWithId,
  addNewSubtask,
} from "../controllers/task.controllers";

const router = express.Router();

router.route("/:boardId/task-create").post(auth, createNewTask);
router.route("/:taskId").patch(auth, updateTask).delete(auth, deleteTaskWithId);
router.route("/:taskId/subtask-create").post(auth, addNewSubtask);

export default router;
