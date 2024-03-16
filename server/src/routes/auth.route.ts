import express from "express";
import { signIn, signUp } from "../controller/auth.controller";

const router = express.Router();

// router.get('/')
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
