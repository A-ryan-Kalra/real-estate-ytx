import express from "express";
import { UserProps } from "../utils/verifyUser";
import errorHandler from "../utils/errorHandler";
import Comment from "../models/comment.model";
import { nextTick } from "process";

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

export const editComment = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { message } = req.body;

    const comment = await Comment.findById(req.params.commentId);
    if (!req.user.isAdmin && req.user.id !== comment?.userId) {
      next(errorHandler(403, "You are not allowed to edit the comment"));
    }
    const editComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: message,
      },
      {
        new: true,
      }
    );
    res.status(201).json(editComment);
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

export const deleteComment = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const commentid = await Comment.findById(req.params.commentId);
    // console.log()
    if (!commentid) {
      return next(errorHandler(404, "Comment does not exist"));
    }
    if (!req.user.isAdmin && req.user.id !== commentid?.userId) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const deleteAllComments = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete User's listing")
      );
    }
    const allComments = await Comment.deleteMany({
      userId: req.params.userId,
    });
    if (allComments.deletedCount === 0) {
      return next(errorHandler(404, "Comments does not exist"));
    }

    return res.status(200).json("All Comments deleted");
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const likecomment = await Comment.findById(req.params.commentId);
    if (!likecomment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (!likecomment.likes.includes(req.user.id)) {
      likecomment.likes.push(req.user.id);
    } else {
      likecomment.likes = likecomment.likes.filter((id) => id !== req.user.id);
    }
    await likecomment.save();
    return res.status(200).json(likecomment);
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.user.isAdmin) {
      next(errorHandler(403, "You are not allowed to see all the listings"));
    }
    const allComments = await Comment.find().sort({ createdAt: "desc" });
    return res.status(200).json(allComments);
  } catch (error) {
    next(error);
  }
};
