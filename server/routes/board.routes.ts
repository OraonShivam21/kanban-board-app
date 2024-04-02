import express from "express";
import { createNewBoard, getAllBoards, getBoardWithId } from "../controllers/board.controllers";
import auth from "../middlewares/auth.middlewares";

const router = express.Router();

router.route("/").get(auth, getAllBoards).post(auth, createNewBoard);
router.route("/:id").get(auth, getBoardWithId);

export default router;
