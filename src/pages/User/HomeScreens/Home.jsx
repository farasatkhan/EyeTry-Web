import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default () => {
  return (
    <div className="swiper-container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className="h-24 w-24 bg-red-600"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-24 w-24 bg-red-600"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-24 w-24 bg-red-600"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-24 w-24 bg-red-600"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
