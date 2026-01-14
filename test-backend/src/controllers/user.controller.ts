import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { User } from "../models/user.model";
import { users } from "../data/user.store";

let currentId = 1;

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { password, ...userData } = (req as any).user;

    return res.status(200).json({
      status: 200,
      message: "Success get profile",
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: err,
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: "Username or password is required",
        data: null,
      });
    }

    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "Username already exist!",
        data: null,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: currentId++,
      username,
      password: hashPassword,
    };

    users.push(newUser);

    return res.status(201).json({
      status: 201,
      message: "Success register user",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server error",
      data: err,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Username is not found",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: "Password did not match",
        data: null,
      });
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
    });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      status: 200,
      message: "Login Success",
      data: {
        token,
        user: userData,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};
