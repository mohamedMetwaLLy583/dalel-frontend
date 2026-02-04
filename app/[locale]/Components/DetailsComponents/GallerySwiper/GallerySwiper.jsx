"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export default function GallerySwiper({ images, selectedImg, setSelectedImg }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={isMobile ? 2 : 3}
        spaceBetween={24}
        grabCursor={true}
        centeredSlides={false}
        centerInsufficientSlides={false}
        navigation={true}
        speed={1000}
        loop={true}
        modules={[Navigation]}
        className="project_gallery h-full"
      >
        {images?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                className={`aspect-[1.36/1] object-cover rounded-lg transition-all duration-300 ${
                  index === selectedImg
                    ? "border-2 border-custom-secondarycolor"
                    : ""
                }`}
                src={item}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImg(index)}
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Watermark at Bottom Right */}
              <div
                className="absolute bottom-2 right-2 opacity-50 cursor-pointer"
                onClick={() => setSelectedImg(index)}
              >
                <img
                  src="/watermark/watermark.svg"
                  alt="Dalel Jawaa Watermark"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
