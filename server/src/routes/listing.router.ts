import express from "express";
import { createListing } from "../controller/listing.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyUser, createListing);

export default router;
