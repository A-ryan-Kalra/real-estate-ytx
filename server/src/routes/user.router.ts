import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.controller";

const router = express.Router();

router.get("/getUsers", getUsers);
router.put("/update/:userId", updateUser);
router.delete("/delete/:userId", deleteUser);
router.get("/getUser/:userId", getUser);

export default router;
