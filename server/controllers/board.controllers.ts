import { Request, Response } from "express";
import { Document, Types } from "mongoose";
import User from "../models/user.models";
import Board, { IBoard } from "../models/board.models";
import Task from "../models/task.models";
import Subtask from "../models/subtask.models";

const createNewBoard = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const boardFound = await Board.findOne({ name });
    if (boardFound) throw "Board with same name is already created!";

    const board = new Board({ name });
    await board.save();

    const user = await User.findById(req.body.userID);
    if (!user) throw "User not found";
    user.boards.push(board._id);
    await user.save();

    res.status(200).json({ message: "New board has been created!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllBoards = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userID);
    if (!user) throw "User not found";
    const boards: (Document<any, {}> & IBoard)[] = [];
    for (const boardId of user.boards) {
      const board = await Board.findOne(boardId);
      if (board) {
        boards.push(board);
      }
    }
    res.status(200).json({ boards });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getBoardWithId = async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const user = await User.findById(req.body.userID);
    if (!user) throw "User not found";

    if (!user.boards.includes(new Types.ObjectId(boardId)))
      throw "The board is not accessible to you!";

    const board = await Board.findById(boardId);
    if (!board) throw "No board found!";

    const tasks = await Promise.all(
      board.tasks.map(async (taskId) => {
        const task = await Task.findById(taskId);

        const subtasks = await Promise.all(
          (task?.subtask ?? []).map(async (subtaskId) => {
            const subtask = await Subtask.findById(subtaskId);
            return subtask;
          })
        );

        const taskDetails = {
          _id: task?._id,
          title: task?.title,
          status: task?.status,
          subtask: subtasks,
        }

        return taskDetails;
      })
    );

    const boardDetails = {
      _id: board._id,
      name: board.name,
      tasks,
    };

    res.status(200).json({ board: boardDetails });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { createNewBoard, getAllBoards, getBoardWithId };
