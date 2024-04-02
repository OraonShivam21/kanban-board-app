import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  tasks: mongoose.Types.ObjectId[];
}

const boardSchema: Schema<IBoard> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Board = mongoose.model<IBoard>("Board", boardSchema);

export default Board;
