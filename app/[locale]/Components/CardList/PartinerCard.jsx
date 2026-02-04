/* eslint-disable @next/next/no-img-element */
'use client';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

function PartinerCard({ item, isPage, onSelect, isSelected }) {
  const baseClasses =
    'bg-white hover:scale-105 bg-white  duration-300 cursor-pointer ease-in-out flex flex-col items-center justify-center gap-4 min-h-[170px] p-4 rounded-lg border-[0.5px] transition-all';

  const selectedClass = isSelected
    ? 'border-custom-maincolor bg-[#18ad8f]'
    : 'border-[#525252] bg-white';

  return (
    <>
      {isPage === true ? (
        <div onClick={onSelect} className={`${baseClasses} ${selectedClass}`}>
          <div className='flex flex-row items-center gap-2'>
            {/* <h2 className='font-semibold text-[24px]'>{item.name}</h2> */}
            {isSelected && (
              <div className='absolute top-2 right-2 bg-white rounded-full p-1 shadow-md'>
                <FaCheckCircle className='text-[#18ad8f] text-2xl' />
              </div>
            )}
            <img src={item.sticker} alt={item.name} className='max-h-[70px] ' />
          </div>
          <hr className='h-[1px] w-[80%] rounded-full bg-[#525252]' />
          <p className='text-[20px] font-semibold text-[#525252]'>
            {item.offer}
          </p>
        </div>
      ) : (
        <Link href={item.link} className={`${baseClasses} border-[#525252]`}>
          <div className='flex flex-row items-center gap-2'>
            {/* <h2 className='font-semibold text-[24px]'>{item.name}</h2> */}
            <img src={item.image} alt={item.name} className='max-h-[70px]' />
          </div>
        </Link>
      )}
    </>
  );
}

export default PartinerCard;
