import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models";

const userRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound)
      throw `User with email ${email} is already registered. Please try to login!`;
    bcrypt.hash(
      password,
      5,
      async (err: Error | undefined, hash: string | null) => {
        if (err)
          return res.status(500).json({ error: "Internal server error" });
        if (!hash)
          return res.status(400).json({ error: "Failed to generate hash" });
        const user = new User({ email, password: hash });
        await user.save();
        res.status(201).json({ message: "New user has been registered" });
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) throw "Please register yourself first!";
    bcrypt.compare(
      password,
      userFound.password,
      (err: Error | undefined, result: boolean) => {
        if (err)
          return res.status(500).json({ error: "Internal server error" });
        if (!result)
          return res.status(400).json({ error: "Invalid credentials" });

        const accessToken = jwt.sign(
          { userID: userFound._id },
          process.env.ACCESS_TOKEN_SECRET!
        );
        res
          .status(200)
          .json({ message: "Successfully logged in", accessToken });
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { userRegister, userLogin };
