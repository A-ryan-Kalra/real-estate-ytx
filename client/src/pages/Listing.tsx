import { Link, useParams } from "react-router-dom";
import useGetListing from "../hooks/useGetListing";
import React, { useEffect, useState } from "react";
import { ListingDataProps } from "../constants/types";
import { Icon } from "@iconify/react";
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiLocationMarker, HiOutlinePaperClip } from "react-icons/hi";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import { HashLoader, ScaleLoader } from "react-spinners";

function Listing() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [contact, setContact] = useState(false);
  const urlParams = useParams();
  const { data, isLoading } = useGetListing(urlParams.id as string);
  const [message, setMessage] = useState("");
  const [userPost, setUserPost] = useState<any>();
  const [listing, setListing] = useState<ListingDataProps>(data);
  const [show, setSHow] = useState(false);
  // console.log(isLoading, "isLoad");
  // console.log(isValidating, "isVal");
  // console.log(data, "data");

  useEffect(() => {
    const postUser = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${listing?.userRef}`);
        const data = await res.json();
        if (res.ok) {
          // console.log(data);
          setUserPost(data);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (listing && Object.keys(listing).length > 0) {
      postUser();
    }
  }, [listing]);
  // console.log(listing);

  useEffect(() => {
    setListing(data);
  }, [data]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setSHow(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const copyLink = async () => {
    await window.navigator.clipboard.writeText(window.location.href);
    setSHow(true);
  };
  // console.log(currentUser);
  return (
    <div className="min-h-screen">
      {!isLoading && listing && Object?.keys(listing)?.length !== 0 ? (
        <>
          <div className="relative w-[95%] my-5 mx-auto shadow-xl transition duration-150 rounded-xl border-2 overflow-hidden h-[500px]">
            <div
              title="Copy this link"
              onClick={copyLink}
              className="absolute top-16 hover:scale-105 duration-500 ease-in-out hover:shadow-white cursor-pointer shadow-md z-[10] p-2 right-10 rounded-full bg-white"
            >
              <HiOutlinePaperClip size={40} className="  text-slate-600" />
            </div>
            {show && (
              <div className="absolute top-32 border-2 border-slate-500 text-white duration-500 ease-in-out  cursor-default  z-[10] p-2 right-16 rounded-full bg-slate-500">
                Link Copied
              </div>
            )}
            <Swiper
              cssMode={true}
              slidesPerView={1}
              // spaceBetween={30}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              loop={listing?.imageUrls?.length > 1 ? true : false}
              mousewheel={true}
              keyboard={true}
              className="w-full flex overflow-hidden items-center h-full"
              modules={[Autoplay, Navigation, Pagination, Keyboard, Mousewheel]}
            >
              {listing?.imageUrls?.map((i: string, index: number) => (
                <SwiperSlide
                  key={index}
                  className="w-full  overflow-hidden px-[5px] pb-7 pt-0.5 h-full"
                >
                  <img
                    alt="img"
                    loading="lazy"
                    className="object-cover rounded-xl  relative  w-full h-full"
                    src={i || ""}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="p-3 max-w-[900px] mx-auto flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">
              {listing?.name} - ₹
              {Math.round(
                listing?.regularPrice - listing?.discountPrice!
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              {listing?.type == "rent" ? "/ month" : ""}
            </h1>
            <p className="flex text-lg text-slate-600 gap-3 my-3">
              <span>
                <HiLocationMarker className="text-teal-500" size={24} />
              </span>{" "}
              {listing?.address}
            </p>
            <div className="flex gap-3">
              <div className="bg-slate-400 whitespace-nowrap py-2 px-4 md:px-10 text-slate-100 font-semibold rounded-xl shadow-md">
                {listing?.type === "rent" ? "For Rent" : "For Sale"}
              </div>
              <div className="bg-teal-500 py-2 px-4 md:px-10 text-slate-100 font-semibold rounded-xl shadow-md">
                ₹
                {listing?.discountPrice!.toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                discount
              </div>
            </div>
            <h1 className="text-slate-800 tracking-wider my-3">
              <span className="font-semibold">Description</span> -{" "}
              {listing?.description}
            </h1>
            <ul className="flex items-center gap-4 flex-wrap">
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <Icon className="text-teal-800" icon="fa:bath" width={20} />{" "}
                {listing?.bathrooms} Baths
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <Icon className="text-teal-800" icon="fa:bed" width={20} />{" "}
                {listing?.bedrooms} Beds
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <Icon
                  className="text-teal-800"
                  icon="fluent:vehicle-car-parking-20-filled"
                  width={20}
                />
                {listing?.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <Icon
                  className="text-teal-800"
                  icon="solar:sofa-bold"
                  width={20}
                />{" "}
                {listing?.furnished ? "Furnished" : "Not Furnished"}
              </li>
            </ul>
            {currentUser &&
              !contact &&
              listing?.userRef !== currentUser?._id && (
                <button
                  onClick={() => setContact(true)}
                  className="border-2 p-2 rounded-md shadow-md  bg-indigo-700 font-semibold text-white border-indigo-400 hover:scale-105 duration-300 ease-in-out"
                >
                  Contact Landlord
                </button>
              )}
            {contact && (
              <div className="flex flex-col gap-1">
                <textarea
                  onChange={handleChange}
                  value={message}
                  className="w-full p-2  resize-none rounded-md bg-slate-200 h-20 placeholder:text-slate-800"
                  placeholder="Enter your message here"
                />
                <h1 className="my-2">
                  Contact{" "}
                  <span className="font-semibold">{userPost?.username}</span>{" "}
                  for <span className="font-semibold">{listing?.name}</span>
                </h1>
                <Link
                  to={`mailto:${userPost?.email}?subject=Regarding ${listing.name}&body=${message}`}
                  className="border-2 p-2 rounded-md flex-1 shadow-md text-center bg-indigo-600 hover:bg-opacity-90 font-semibold text-white border-indigo-400  duration-200 ease-in-out w-full"
                >
                  Send Message
                </Link>
              </div>
            )}
            <Comments
              currentUser={currentUser}
              postId={listing?._id as string}
            />
          </div>
        </>
      ) : listing === undefined && !isLoading ? (
        <div className="min-h-[70vh] flex justify-center items-center gap-3 flex-col px-4  w-full">
          <h1 className="text-xl">Uh-Oh, Nothing To See Here!</h1>
          <h1 className="text-2xl">
            The page you requested doesn't exist. Please try a different
            direction.
          </h1>
          <HashLoader
            speedMultiplier={1}
            className="w-full"
            size={70}
            color="#36d7b7"
          />
        </div>
      ) : (
        <div className="flex  justify-center items-center relative min-h-[80vh]">
          <ScaleLoader
            height={40}
            width={7}
            radius={2}
            margin={2}
            color="#36d7b7"
            speedMultiplier={2}
            className="max-lg:translate-y-[-25%]  mx-auto relative max-lg:bottom-[25%] "
          />
        </div>
      )}
    </div>
  );
}

export default Listing;
