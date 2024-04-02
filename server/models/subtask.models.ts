import mongoose, { Schema, Document } from "mongoose";

interface ISubtask extends Document {
  title: string;
  isCompleted: boolean;
}

const subtaskSchema: Schema<ISubtask> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Subtask = mongoose.model<ISubtask>("Subtask", subtaskSchema);

export default Subtask;
