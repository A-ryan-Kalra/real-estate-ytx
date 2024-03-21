import express from "express";
import {
  createListing,
  deleteListing,
  editListing,
  getListing,
  getListings,
  getSpecificListing,
} from "../controller/listing.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.get("/getlisting/:userId", verifyUser, getListing);
router.get("/getlistings", verifyUser, getListings);
router.get("/specificlisting/:id", getSpecificListing);
router.post("/create/:userId", verifyUser, createListing);
router.delete("/delete/:listingId", verifyUser, deleteListing);
router.put("/editlisting/:listingId", verifyUser, editListing);

export default router;
