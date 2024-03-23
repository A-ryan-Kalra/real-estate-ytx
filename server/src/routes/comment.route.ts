import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  likeComment,
} from "../controller/comment.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.get("/getcomments/:postId", getComments);
router.put("/like/:commentId", verifyUser, likeComment);
router.put("/editComment/:commentId", verifyUser, editComment);
router.post("/create/:postId", verifyUser, createComment);
router.delete("/delete/:commentId", verifyUser, deleteComment);

export default router;
