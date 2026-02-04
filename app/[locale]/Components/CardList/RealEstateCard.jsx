import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function RealEstateCard({
  image,
  title,
  description,
  price,
  linkRef,
  reservation,
  view,
  isAvailable,
  offerType,
}) {
  const t = useTranslations();
  return (
    <Link
      href={isAvailable === 1 ? linkRef : '#'}
      className={
        isAvailable === 0 ? 'pointer-events-none cursor-not-allowed' : ''
      }
    >
      <div className='relative  h-[354px] md:h-[364px] flex flex-col  justify-center'>
        <div className='bg-custom-whiteColor z-40 absolute w-[144px] mt-[12.5px] h-[28px] md:w-[186px] md:h-[36px] flex items-center justify-between px-[12px]  top-[16px] md:top-[20px] lg:top-[16px] right-[10px] rounded-[5px]'>
          <div className='flex flex-row items-center justify-center gap-x-[4px]'>
            <img
              className='md:w-[28px] md:h-[28px]'
              src='/CardIcons/mdi_eye-outline.svg'
              alt='viewsicon'
            />
            <p className='text-[14px] md:text-[16px] font-bold  text-custom-gray525'>
              {view}
            </p>
          </div>
          <div className='flex flex-row items-center justify-center gap-x-[4px]'>
            <img
              className='md:w-[28px] md:h-[28px]'
              src='/CardIcons/mdi_key-chain.svg'
              alt='keychainicon'
            />
            <p className='text-[14px] md:text-[16px] font-bold  text-custom-gray525'>
              {reservation}
            </p>
          </div>
        </div>

        {/* figure with Watermark */}
        <figure className='relative w-full h-[65.9%] flex items-center justify-center rounded-[15px] overflow-hidden'>
          <img
            className='w-full h-full object-cover'
            width='800'
            height='600'
            src={image}
            alt='RealEstateImage'
          />
          {/* Overlay inside the image */}
          {isAvailable === 0 && (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold z-50'>
              {offerType === 'rent'
                ? t('Availability.notAvailable')
                : t('Availability.salenotAvailable')}
            </div>
          )}
          <div className='absolute bottom-2 right-2 opacity-50'>
            <img
              src='/watermark/watermark.svg'
              alt='Dalel Jawaa Watermark'
              className='w-8 h-8 object-contain'
            />
          </div>
        </figure>
        <p className='text-custom-BlackColor  pt-[16px] text-[16px] md:text-[18px] xl:text-[20px] font-normal leading-[20px] xl:leading-[25px] text-ellipsis-1 overflow-hidden'>
          {title}
        </p>
        <p className='text-custom-Gray858 pt-[8px] font-normal text-[14px] xl:text-[16px] text-ellipsis-1 overflow-hidden leading-[17.5px] xl:leading-[20px]'>
          {description}
        </p>
        <div className='flex flex-row items-center justify-between pt-[16px]'>
          <p className=' text-ellipsis-1 overflow-hidden text-custom-BlackColor font-bold text-[16px] leading-[20px] md:text-[18px] xl:text-[20px] xl:leading-[25px]'>
            {price} {t('Currency')}
          </p>
          <p className='text-custom-maincolor font-bold text-[16px] leading-[20px] xl:leading-[22.5px] xl:text-[18px]'>
            {t('RealEstateCard.details')}
          </p>
        </div>
      </div>
    </Link>
  );
}
