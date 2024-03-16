import express from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";

export const testing = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(200).json({ message: "Api is working" });
};

export const signUp = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email) {
      next(errorHandler(400, "All fields are required."));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user: any = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(409, "All fields are required"));
    }
    const user: any = await User.findOne({
      email,
    });
    const hashedPassword = bcryptjs.compareSync(
      password,
      user?.password as string
    );
    if (!hashedPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }
    const { password: pass, ...rest } = user._doc;
    const token = jwt.sign(
      {
        id: user?._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_TOKEN as string
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
