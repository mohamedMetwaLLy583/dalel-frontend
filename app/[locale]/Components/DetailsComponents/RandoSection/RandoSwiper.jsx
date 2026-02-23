"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import RealEstateCard from "../../CardList/RealEstateCard";

export default function RandoSwiper({ lang, data, parentType }) {
  const slidesPerView = data.length || 1;

  // console.log(data[0]);

  return (
    <div className="custom_container">
      <Swiper
        slidesPerView={Math.min(slidesPerView, 5)}
        spaceBetween={24}
        grabCursor={true}
        loop={slidesPerView > 2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          waitForTransition: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: Math.min(slidesPerView, 2) },
          768: { slidesPerView: Math.min(slidesPerView, 2) },
        }}
        modules={[Navigation, Autoplay]}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <RealEstateCard
              reservation={item.reservations_count}
              view={item.view_count}
              title={item.title}
              description={item.description}
              price={item.price}
              linkRef={`/${lang}/${parentType}/${item.id}`}
              image={item.image}
              area={item.area}
              rooms={item.rooms}
              bathrooms={item.bathrooms}
              addedBy={item.added_by}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
