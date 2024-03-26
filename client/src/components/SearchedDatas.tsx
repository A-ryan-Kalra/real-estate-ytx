import { Link } from "react-router-dom";
import { ListingDataProps } from "../constants/types";
import { HiLocationMarker } from "react-icons/hi";

function SearchedData({
  post,
  isLoading,
}: {
  isLoading: boolean;
  post: ListingDataProps;
}) {
  // console.log(post);
  return (
    <div className="flex flex-col max-md:mx-auto gap-1 border-2 shadow-md  hover:shadow-slate-400 duration-300 rounded-lg overflow-hidden">
      <Link to={`/listing/${post?._id}`} className="overflow-hidden">
        <img
          src={post?.imageUrls[0]}
          className="w-[320px] h-[280px] object-cover hover:scale-105 hover:shadow-slate-600 duration-300"
          alt="img"
        />
      </Link>
      <div className=" left-1 relative flex flex-col gap-1">
        <h1 className="font-semibold">{post?.name}</h1>
        <h1 className="text-slate-600 whitespace-nowrap text-[14px] flex items-center">
          <HiLocationMarker className="text-teal-400" size={18} />
          {post?.address}
        </h1>
        <h1 className="text-slate-600 line-clamp-1 text-[14px] w-[320px]">
          {post?.description}
        </h1>
        <h1 className="whitespace-nowrap">
          ₹
          {post?.regularPrice.toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
          {post?.type === "rent" ? " /month" : ""}
        </h1>
        <div className="flex gap-2 items-cente ">
          <h1>
            {post?.bedrooms} {post?.bedrooms === 1 ? "Bed" : "Beds"}{" "}
          </h1>
          <h1>
            {" "}
            {post?.bathrooms} {post?.bathrooms === 1 ? "Bath" : "Baths"}{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SearchedData;
