import { Link } from "react-router-dom";
import useGetSearchedItem from "../hooks/useGetSearchedItem";
import { useEffect, useState } from "react";
import { ListingDataProps, SearchProps } from "../constants/types";
import SearchedData from "./SearchedDatas";
import { ClipLoader } from "react-spinners";

function ListingTypes({
  description,
  type,
}: {
  description: string;
  type: string;
}) {
  const { data, error, isLoading, mutate } = useGetSearchedItem(type);
  const [listing, setListing] = useState<ListingDataProps[]>();

  //   console.log(listing);

  useEffect(() => {
    if (data?.length > 0) {
      setListing(data as ListingDataProps[]);
    }
  }, [data]);

  return (
    <div className="flex max-md:items-center lg:px-10 px-1 flex-col gap-2 my-10">
      <h1 className="lg:text-3xl text-2xl text-slate-600 font-semibold">
        Recent {description}
      </h1>
      <Link
        to={`/search?${type}`}
        className="text-slate-600 hover:underline w-fit"
      >
        Show more {description}
      </Link>
      <div className="flex flex-wrap gap-4 items-center ">
        {listing && listing?.length > 0 ? (
          listing?.map((list: ListingDataProps, index: number) => (
            <SearchedData key={index} post={list} />
          ))
        ) : (
          <div className="w-full items-center flex  gap-4 my-2">
            <ClipLoader size={50} color="#36d7b7" speedMultiplier={2} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingTypes;
