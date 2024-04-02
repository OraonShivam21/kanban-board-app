import { Request, Response } from "express";
import Task from "../models/task.models";
import Subtask from "../models/subtask.models";
import Board from "../models/board.models";

const createNewTask = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;

    const { title, description } = req.body;
    const task = new Task({ title, description, subtask: [] });
    await task.save();

    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        $push: { tasks: task._id },
      },
      { new: true }
    );

    res.status(201).json({ message: "Task has been created", task });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const payload = req.body;
    const task = await Task.findByIdAndUpdate(taskId, payload);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteTaskWithId = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addNewSubtask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const { title, isCompleted } = req.body;
    const subtask = new Subtask({ title, isCompleted });
    await subtask.save();

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        $push: { subtask: subtask._id },
      },
      { new: true }
    );

    if (!task) throw "Task not found";

    res.status(201).json({ message: "Added new subtask", task });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { createNewTask, updateTask, deleteTaskWithId, addNewSubtask };
