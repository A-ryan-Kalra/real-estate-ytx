import express from "express";
import { google, signIn, signUp } from "../controller/auth.controller";

const router = express.Router();

// router.get('/')
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);

export default router;
