import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const ImageSlider = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="w-80 pr-4 m-0 cursor-pointer"
    >
      {images?.map((image, index) => (
        <SwiperSlide key={index} itemID={3}>
          <img
            src={`http://localhost:8000/images/products/images/${image}`}
            className="block w-80 object-cover rounded-lg"
            alt="slider"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
