import React from 'react';
import { Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function SliderGallery(prop) {
  return (
    <div id="gallery">
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        {prop.val.details.map((imgSource, i) => (
          <SwiperSlide key={i}>
            <img src={imgSource} alt="pic" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
