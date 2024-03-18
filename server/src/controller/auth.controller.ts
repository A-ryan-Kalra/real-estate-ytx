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
    const token = jwt.sign(
      {
        id: user?._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_TOKEN as string
    );
    // console.log(token);

    const { password: pass, ...rest } = user._doc;
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
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
    if (!user) {
      return next(errorHandler(404, "User does not exist"));
    }
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

export const google = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, username, profilePicture } = req.body;

    const user: any = await User.findOne({ email });
    console.log(user, "user");

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_TOKEN as string
      );
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const result: any = new User({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: hashedPassword,
        email,
        profilePicture,
      });

      // console.log(result, "result");
      await result.save();
      const token = jwt.sign(
        {
          id: result._id,
          isAdmin: result.isAdmin,
        },
        process.env.JWT_TOKEN as string
      );
      const { password: pass, ...rest } = result._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User has been signed out" });
  } catch (error) {
    next(error);
  }
};
