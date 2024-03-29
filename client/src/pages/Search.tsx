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
  const { data, isLoading } = useGetSearchedItem(urlParams.toString());
  const [show, setShow] = useState(false);
  const [post, setPost] = useState<ListingDataProps[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    if (data?.length > 0) {
      setPost(data as ListingDataProps[]);
    }
    if (data?.length === 5) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [data]);

  const handleMore = async () => {
    // console.log("lololol");
    const startIndex = post?.length;
    urlParams.set("startIndex", startIndex as unknown as string);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/getSearchedItem?${searchQuery}`);
    const data = await res.json();
    if (data?.length === 5) {
      setShow(true);
    } else {
      setShow(false);
    }
    if (res.ok) {
      setPost((prev: any) => [...prev, ...data]);
      // console.log(data, "lololol");
    } else {
      console.error(data);
    }
    // navigate(`/search?${searchQuery}`);
  };

  // console.log(post);
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
              <SearchedData post={pos} key={index} />
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
        {show && (
          <div className="w-full flex justify-center" onClick={handleMore}>
            <button className=" p-2 rounded-md hover:scale-105 hover:shadow-teal-200 duration-300 ease-in-out mx-auto bg-teal-400 text-white hover:underline font-semibold shadow-md">
              Search More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
