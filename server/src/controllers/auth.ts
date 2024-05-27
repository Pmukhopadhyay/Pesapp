// src/controllers/authRoutes.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import "dotenv/config";

const secretKey = process.env.SCRETKEY || "";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log("from server --- login called--before user ..13");
    const user = await User.findOne({ email });
    console.log("from server --- login called--15");

    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
    res.cookie('jwt',token, { httpOnly: true, secure: false, maxAge: 3600000 });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
