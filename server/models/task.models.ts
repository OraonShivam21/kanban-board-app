import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "Todo" | "Doing" | "Done";
  subtask: mongoose.Types.ObjectId[];
}

const taskSchema: Schema<ITask> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["Todo", "Doing", "Done"],
      default: "Todo",
    },
    subtask: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Subtask",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
