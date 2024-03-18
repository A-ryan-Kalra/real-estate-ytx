import express from "express";
import { google, signIn, signUp, signout } from "../controller/auth.controller";

const router = express.Router();

// router.get('/')
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/signout", signout);

export default router;
