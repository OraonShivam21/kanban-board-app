import express, { Request, Response } from "express";
import connection from "./connection";
import userRouter from "./routes/user.routes";
import boardRouter from "./routes/board.routes";
import taskRouter from "./routes/task.routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Kanban Board App API!" });
});

// implementing various routes
app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to mongodb");
    console.log("listening on port", PORT);
  } catch (error) {
    console.log("error connecting to db", error);
  }
});
