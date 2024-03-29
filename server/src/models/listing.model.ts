import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "rent",
    },
    userRef: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [
        "https://assets.architecturaldigest.in/photos/6000491e1626622a53c5f133/master/w_1600%2Cc_limit/Beachyhead_1a_Int016_Bedroom_001_al.jpg",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const listing = mongoose.model("Listing", listingSchema);

export default listing;
