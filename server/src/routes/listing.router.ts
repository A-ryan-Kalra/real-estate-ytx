import express from "express";
import {
  createListing,
  deleteListing,
  deleteUserListing,
  editListing,
  getListing,
  getListings,
  getSearchedItem,
  getSpecificListing,
} from "../controller/listing.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.get("/getlisting/:userId", verifyUser, getListing);
router.get("/getlistings", verifyUser, getListings);
router.get("/specificlisting/:id", getSpecificListing);
router.get("/getSearchedItem", getSearchedItem);
router.post("/create/:userId", verifyUser, createListing);
router.delete("/delete/:listingId", verifyUser, deleteListing);
router.delete("/deleteUserListings/:userId", verifyUser, deleteUserListing);
router.put("/editlisting/:listingId", verifyUser, editListing);

export default router;
