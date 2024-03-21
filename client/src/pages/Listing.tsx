import { useParams } from "react-router-dom";
import useGetListing from "../hooks/useGetListing";
import { useEffect, useState } from "react";
import { ListingDataProps } from "../constants/types";

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
import {
  HiClipboardCopy,
  HiLocationMarker,
  HiOutlinePaperClip,
} from "react-icons/hi";

function Listing() {
  const urlParams = useParams();
  const { data, error, isLoading, mutate } = useGetListing(
    urlParams.id as string
  );
  const [listing, setListing] = useState<ListingDataProps>(data);
  const [show, setSHow] = useState(false);
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

  console.log(listing);
  const copyLink = async () => {
    await window.navigator.clipboard.writeText(window.location.href);
    setSHow(true);
  };
  return (
    <div className="min-h-screen">
      <div className="relative w-[95%] my-5 mx-auto shadow-xl transition duration-150 rounded-xl border-2 overflow-hidden h-[500px]">
        <div
          title="Copy this link"
          onClick={copyLink}
          className="absolute top-16 hover:scale-105 duration-500 ease-in-out hover:shadow-white cursor-pointer shadow-md z-[10] p-2 right-10 rounded-full bg-white"
        >
          <HiOutlinePaperClip size={40} className="  text-slate-600" />
        </div>
        {show && (
          <div className="absolute top-32 border-2 border-slate-500 text-white duration-500 ease-in-out  cursor-pointer  z-[10] p-2 right-16 rounded-full bg-slate-500">
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
          loop={true}
          mousewheel={true}
          keyboard={true}
          className="w-full flex overflow-hidden items-center h-full"
          modules={[Autoplay, Navigation, Pagination, Keyboard, Mousewheel]}
        >
          {listing?.imageUrls?.map((i: string, index: number) => (
            <SwiperSlide
              key={index}
              className="w-full  overflow-hidden px-[5px] pb-7 pt-1 h-full"
            >
              <img
                alt="img"
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
          / month
        </h1>
        <p className="flex text-lg text-slate-600 gap-3 my-3">
          <span>
            <HiLocationMarker className="text-teal-500" size={24} />
          </span>{" "}
          {listing?.address}
        </p>
        <div className="flex gap-3">
          <div className="bg-slate-400 py-2 px-10 text-slate-100 font-semibold rounded-xl shadow-md">
            {listing?.type === "rent" ? "For Rent" : "For Sale"}
          </div>
          <div className="bg-teal-500 py-2 px-10 text-slate-100 font-semibold rounded-xl shadow-md">
            ₹
            {listing?.discountPrice!.toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{" "}
            discount
          </div>
        </div>
        <h1 className="text-slate-800 tracking-wider line">
          <span className="font-semibold">Description</span> -{" "}
          {listing?.description}
        </h1>
        <div></div>
      </div>
    </div>
  );
}

export default Listing;
