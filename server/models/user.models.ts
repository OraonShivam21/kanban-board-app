import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  boards: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    boards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Board",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
