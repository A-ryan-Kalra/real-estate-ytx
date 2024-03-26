import bcryptjs from "bcryptjs";
import express from "express";
import User from "../models/user.model";
import { deleteModel } from "mongoose";
import errorHandler from "../utils/errorHandler";
import { UserProps } from "../utils/verifyUser";

export const updateUser = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user.id !== req.params.userId) {
    next(errorHandler(403, "You are not allowed to update the user"));
  }
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
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user.isAdmin) {
    next(errorHandler(405, "You are not allowed to see all users"));
  }
  try {
    const getAllUser: any = await User.find().sort({ createdAt: "desc" });
    let arr: any = [];
    getAllUser.map((user: any) => {
      const { password, ...rest } = user._doc;
      arr.push(rest);
      // console.log(rest);
    });
    // console.log(arr);
    // console.log("rest");
    return res.status(200).json(arr);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      next(errorHandler(404, "User does not exist"));
    }
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const getUser: any = await User.findById(req.params.userId);
    const { password, ...rest } = getUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
