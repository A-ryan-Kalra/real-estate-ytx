import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controller/comment.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.get("/getcomments/:postId", getComments);
router.post("/create/:postId", verifyUser, createComment);
router.delete("/delete/:commentId", verifyUser, deleteComment);

export default router;
