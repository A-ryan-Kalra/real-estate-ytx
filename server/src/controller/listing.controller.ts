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
