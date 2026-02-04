'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import PartinerCard from '../../CardList/PartinerCard';

export default function PartinerSwiper({ cards, isPage, data }) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const match = document.cookie.match(/selectedPartnerId=(\d+)/);
    if (match) {
      setSelectedId(parseInt(match[1]));
    }
  }, []);

  const handleSelect = (id) => {
    document.cookie = `selectedPartnerId=${id}; path=/`;
    setSelectedId(id);
  };

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
        className={'TestimonialsSwiper py-10 z-10'}
      >
        {isPage &&
          data?.map((partner) => {
            return (
              <SwiperSlide key={partner.id} className='min-h-[260px]'>
                <PartinerCard
                  item={partner}
                  isPage={isPage}
                  isSelected={selectedId === partner.id}
                  onSelect={() => handleSelect(partner.id)}
                />
              </SwiperSlide>
            );
          })}
        {cards?.map((partner) => {
          return (
            <SwiperSlide key={partner.id} className='min-h-[260px]'>
              <PartinerCard
                item={partner}
                isPage={isPage}
                isSelected={selectedId === partner.id}
                onSelect={() => handleSelect(partner.id)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
