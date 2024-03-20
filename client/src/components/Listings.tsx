import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListingDataProps } from "../constants/types";
import { Link } from "react-router-dom";

function Listings() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [listing, setListing] = useState<ListingDataProps[]>([]);

  useEffect(() => {
    const listings = async () => {
      try {
        const result = await fetch(
          `/api/listing/getlisting/${currentUser._id}`
        );
        const data = await result.json();
        // console.log(data);
        if (result.ok) {
          setListing(data as ListingDataProps[]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    listings();
  }, []);
  console.log(listing);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${currentUser._id}`,
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setListing((prev) =>
          prev.filter((list: ListingDataProps) => list._id !== id)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-10 w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">Your Listings</h1>
        {listing &&
          listing?.length > 0 &&
          listing.map((list: ListingDataProps, index: number) => (
            <div
              key={index}
              className=" gap-2 w-full hover:shadow-md hover:shadow-slate-300 duration-300 ease-in-out flex my-2  items-center justify-between rounded-xl overflow-hidden border-2"
            >
              <div className="flex items-start overflow-hidden gap-2">
                <div className="   ">
                  <img
                    src={list.imageUrls[0]}
                    alt="list"
                    className="object-cover w-[90px] h-[70px]"
                  />
                </div>
                <h1 className="text-center p-1 text-[15px] font-semibold">
                  {list.name}
                </h1>
              </div>
              <div className="flex flex-col gap-1 p-2">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(list._id as string)}
                >
                  Delete
                </button>
                <Link
                  to={`/edit-listing/${list._id}`}
                  className="hover:underline text-blue-500"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Listings;