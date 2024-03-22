import express from "express";
import { UserProps } from "../utils/verifyUser";
import errorHandler from "../utils/errorHandler";
import Comment from "../models/comment.model";

export const createComment = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.user.isAdmin && req.user.id !== req.body.formData.userId) {
      return next(errorHandler(403, "You are not allowed to create a comment"));
    }
    const { formData } = req.body;
    const createComment = new Comment({
      content: formData.content,
      postId: req.params.postId,
      userId: formData.userId,
    });
    // if (formData.like) {
    //   createComment.likes.push(formData.userId);
    // }
    await createComment.save();
    return res.status(201).json(createComment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const allComments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    if (allComments.length === 0) {
      return next(errorHandler(404, "The post does not exists"));
    }
    return res.status(200).json(allComments);
  } catch (error) {
    next(error);
  }
};
