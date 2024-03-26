import { useRef } from "react";
import express from "express";
import { UserProps } from "../utils/verifyUser";
import errorHandler from "../utils/errorHandler";
import listing from "../models/listing.model";

export const createListing = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user.id !== req.params.userId) {
    next(errorHandler(403, "You are not allowed to create the listing"));
  }

  const { formData } = req.body;
  try {
    const newlistings = new listing(formData);
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
  try {
    if (!req.user.isAdmin) {
      next(errorHandler(403, "You are not allowed to see all the listings"));
    }
    const allListings = await listing.find().sort({ createdAt: "desc" });
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

export const editListing = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  const { formData } = req.body;
  if (req.user.id !== formData.userRef) {
    return next(errorHandler(403, "You are not allowed to update the listing"));
  }
  try {
    const editedListing = await listing.findByIdAndUpdate(
      req.params.listingId,
      {
        $set: {
          address: formData.address,
          bathrooms: formData.bathrooms,
          bedrooms: formData.bedrooms,
          description: formData.description,
          discountPrice: formData.discountPrice,
          furnished: formData.furnished,
          imageUrls: formData.imageUrls,
          name: formData.name,
          offer: formData.offer,
          parking: formData.parking,
          regularPrice: formData.regularPrice,
          type: formData.type,
          userRef: formData.userRef,
        },
      },
      { new: true }
    );
    if (!editedListing) {
      return next(
        errorHandler(403, "Something went wrong or the listing does not exist")
      );
    }
    res.status(200).json(editedListing);
  } catch (error) {
    next(error);
  }
};

export const getSpecificListing = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const getlist = await listing.findById(req.params.id);
    if (!getlist) {
      return next(errorHandler(404, "The listing does not exist"));
    }
    return res.status(200).json(getlist);
  } catch (error) {
    next(error);
  }
};

export const getSearchedItem = async (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  // console.log("req.query");
  // console.log(req.query);
  const reqQuery = req.query as {
    limit?: string;
    startIndex?: string;
    offer?: string;
    furnished?: string;
    parking?: string;
    type?: string;
    searchTerm?: string;
    sort?: string;
    order?: string;
  };

  const limit = parseInt(reqQuery.limit as string) || 9;
  const startIndex = parseInt(reqQuery.startIndex as string) || 0;
  const searchTerm = reqQuery.searchTerm || "";
  const sort = reqQuery.sort?.split("_")[0] || "createdAt";
  const order = reqQuery.order || "desc";

  // let query: any = {
  //   name: { $regex: searchTerm, $options: "i" },
  // };
  let query: any = {
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { address: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  };
  if (reqQuery.offer === "true") {
    query.offer = reqQuery.offer;
  } else {
    query.offer = { $in: [false, true] };
  }

  if (reqQuery.furnished === "true") {
    query.furnished = reqQuery.furnished;
  } else {
    query.furnished = { $in: [false, true] };
  }

  if (reqQuery.parking === "true") {
    query.parking = reqQuery.parking;
  } else {
    query.parking = { $in: [false, true] };
  }

  // console.log(query, "query");

  if (reqQuery.type === undefined || reqQuery.type === "all") {
    query.type = { $in: ["sale", "rent"] };
  } else if (typeof reqQuery.type === "string") {
    query.type = reqQuery.type;
  }
  // console.log(reqQuery);

  try {
    let sortObj: any = {};
    sortObj[sort] = order;

    const listings = await listing
      .find(query)
      .sort(sortObj)
      .skip(startIndex)
      .limit(limit);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
