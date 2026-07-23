import React from "react";
import banner1 from "../../assets/banner/banner 1.png";
import banner2 from "../../assets/banner/banner 2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <section className="w-[90%] mx-auto mt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="rounded-xl overflow-hidden"
      >
        <SwiperSlide>
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full h-[30vh] md:h-[60vh] lg:h-[90vh] object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={banner2}
            alt="Banner 2"
            className="w-full h-[30vh] md:h-[60vh] lg:h-[90vh] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
