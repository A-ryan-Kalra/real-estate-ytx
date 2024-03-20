import express from "express";
import { UserProps } from "../utils/verifyUser";
import listing from "../models/listing.model";
import errorHandler from "../utils/errorHandler";

export const createListing = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user.id !== req.params.userId) {
    next(errorHandler(403, "You are not allowed to create the listing"));
  }
  const {
    address,
    name,
    description,
    bathrooms,
    bedrooms,
    discountPrice,
    regularPrice,
    furnished,
    offer,
    parking,
    type,
    userRef,
    imageUrls,
  } = req.body;
  try {
    const newlistings = new listing({
      address,
      bathrooms,
      bedrooms,
      discountPrice,
      description,
      furnished,
      offer,
      parking,
      name,
      regularPrice,
      type,
      userRef,
      imageUrls,
    });
    await newlistings.save();
    res.status(200).json(newlistings);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user.id !== req.params.userId) {
    next(errorHandler(403, "You are not allowed to see the listings"));
  }
  const { userId } = req.params;

  try {
    const allListings = await listing.find({ userRef: userId });
    return res.status(200).json(allListings);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "You are not allowed to see all the listings"));
  }
  try {
    const allListings = await listing.find();
    return res.status(200).json(allListings);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(req.body.id, "req.body.id");
  console.log(req.params.listingId, "req.params.listingId");
  if (req.user.id !== req.body.id) {
    return next(errorHandler(403, "You are not allowed to delete the listing"));
  }
  try {
    const deletedListing = await listing.findByIdAndDelete({
      _id: req.params.listingId,
    });
    if (!deletedListing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
};
