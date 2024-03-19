import bcryptjs from "bcryptjs";
import express from "express";
import User from "../models/user.model";

export const updateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, profilePicture, email } = req.body;
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  try {
    const updatedUser: any = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username,
          email,
          profilePicture,
          password: req.body.password,
        },
      },
      {
        new: true,
      }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    return res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const getAllUser: any = await User.find();

    return res.status(200).json(getAllUser);
  } catch (error) {
    next(error);
  }
};
