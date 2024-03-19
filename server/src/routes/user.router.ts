import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.get("/getUsers", verifyUser, getUsers);
router.get("/getUser/:userId", getUser);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);

export default router;
