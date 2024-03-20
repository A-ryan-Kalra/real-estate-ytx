import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
} from "../controller/listing.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.get("/getlisting/:userId", verifyUser, getListing);
router.get("/getlistings", verifyUser, getListings);
router.post("/create/:userId", verifyUser, createListing);
router.delete("/delete/:listingId", verifyUser, deleteListing);

export default router;
