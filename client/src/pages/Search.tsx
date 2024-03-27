import { useLocation } from "react-router-dom";
import SidebarSearchTerm from "../components/SidebarSearchTerm";
import { useEffect, useState } from "react";
import { ListingDataProps } from "../constants/types";
import useGetSearchedItem from "../hooks/useGetSearchedItem";
import SearchedData from "../components/SearchedDatas";
import { ClipLoader, HashLoader } from "react-spinners";

function Search() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { data, error, isLoading, mutate } = useGetSearchedItem(
    urlParams.toString()
  );
  const [post, setPost] = useState<ListingDataProps[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      setPost(data as ListingDataProps[]);
    }
  }, [data]);

  console.log(post);
  return (
    <div className="min-h-screen md:flex-row flex-col relative flex gap-2">
      <div className="md:w-[540px]  max-md:bg-white z-10 h-fit sticky top-0">
        <SidebarSearchTerm />
      </div>
      <div className="flex flex-col gap-4 w-full border-l-2 px-4 py-3">
        <h1 className="w-full text-3xl my-6 border-b-2 p-2 font-semibold text-slate-600 tracking-wide">
          Listing Results:
        </h1>
        <div className="flex flex-wrap gap-8 w-full  max-w-[1200px] ">
          {post?.length > 0 ? (
            post?.map((pos: ListingDataProps, index: number) => (
              <SearchedData post={pos} isLoading={isLoading} key={index} />
            ))
          ) : post?.length === 0 && !isLoading ? (
            <div className=" w-full flex flex-col gap-2 justify-center tex items-center">
              <h1 className="text-2xl">
                {" "}
                Can't find what you are looking for...
              </h1>
              <HashLoader
                speedMultiplier={1}
                className="w-full"
                size={70}
                color="#36d7b7"
              />
            </div>
          ) : (
            <div className=" w-full flex justify-center items-center">
              <ClipLoader size={50} color="#44ab85" speedMultiplier={1} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
