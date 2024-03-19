import express from "express";
import { UserProps } from "../utils/verifyUser";
import listing from "../models/listing.model";

export const createListing = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  const {
    address,
    bathrooms,
    bedrooms,
    description,
    furnished,
    name,
    regularPrice,
    type,
    userRef,
  } = req.body;
  try {
    const newlistings = new listing({
      address,
      bathrooms,
      bedrooms,
      description,
      furnished,
      name,
      regularPrice,
      type,
      userRef,
    });
    await newlistings.save();
    res.status(200).json(newlistings);
  } catch (error) {
    next(error);
  }
};
