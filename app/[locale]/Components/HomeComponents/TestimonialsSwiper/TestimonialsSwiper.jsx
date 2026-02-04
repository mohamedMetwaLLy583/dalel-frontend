'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import TestimonialsCard from '../../CardList/TestimonialsCard';

export default function TestimonialsSwiper({ cards }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        grabCursor={true}
        pagination={{ clickable: true }}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination, Autoplay]}
        className={'TestimonialsSwiper z-10'}
      >
        {cards?.map((item) => {
          return (
            <SwiperSlide key={item.id} className='min-h-[360px]'>
              <TestimonialsCard item={item} className='h-[222px]' />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
