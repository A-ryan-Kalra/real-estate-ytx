import express from "express";
import { getUsers, updateUser } from "../controller/user.controller";

const router = express.Router();

router.get("/getUsers", getUsers);
router.put("/update/:userId", updateUser);

export default router;
