import { Link } from "react-router-dom";
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
import { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpg";
import ListingTypes from "../components/ListingTypes";

function Home() {
  const [imageUrls, setImgUrls] = useState([img1, img2, img3, img4, img5]);

  return (
    <div className="min-h-screen flex flex-col gap-6 w-full  ">
      <div className="flex max-lg:flex-col gap-6 items-center w-full max-w-[1920px] mx-auto  lg:px-10 px-3  min-h-[90vh]">
        <div className="max-w-[1200px] w-full mx-auto flex  flex-col gap-7  my-20">
          <h1 className="lg:text-6xl text-4xl font-bold">
            Find your next <span className="text-slate-500">perfect</span>
            <br />
            place with ease
          </h1>
          <h1>
            <span className="text-teal-500 font-semibold">AryanEstate</span>{" "}
            will help you find your home fast, easy and comfortable. <br />
            Our expert support are always available.
          </h1>
          <Link
            to={`/search?searchTerm=`}
            className="text-blue-700 hover:underline w-fit font-semibold "
          >
            Let's start now...
          </Link>
        </div>
        <div className="relative w-full my-5 mx-auto shadow-xl transition duration-150 rounded-xl border-2 overflow-hidden ">
          <Swiper
            cssMode={true}
            slidesPerView={1}
            // spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={imageUrls?.length > 1 ? true : false}
            mousewheel={true}
            keyboard={true}
            className="w-full flex overflow-hidden items-center h-full"
            modules={[Autoplay, Navigation, Pagination, Keyboard, Mousewheel]}
          >
            {imageUrls?.map((i: string, index: number) => (
              <SwiperSlide
                key={index}
                className="w-full  overflow-hidden px-[5px] pb-7 pt-0.5 h-full"
              >
                <img
                  alt="img"
                  loading="lazy"
                  className="object-cover rounded-xl max-lg:h-[350px] lg:h-[500px] relative h-full w-full"
                  src={i || ""}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8  max-w-[1420px] px-10 py-3 mx-auto">
        <ListingTypes description="offers" type="offer=true" />
        <ListingTypes description="places for rent" type="type=rent" />
        <ListingTypes description="places for sale" type="type=sale" />
      </div>
    </div>
  );
}

export default Home;
