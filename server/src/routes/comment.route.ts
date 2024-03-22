import express from "express";
import { createComment, getComments } from "../controller/comment.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.get("/getcomments/:postId", getComments);
router.post("/create/:postId", verifyUser, createComment);

export default router;
