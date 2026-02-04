'use client';
import React, { useEffect, useState } from 'react';
import LoadingCircle from '../Components/LoadingCircle/LoadingCircle';
import RealEstateCard from '../Components/CardList/RealEstateCard';
import PaginationComponent from './PaginationComponent'; // Import the pagination component
import { useTranslations } from 'next-intl';

const SearchPage = ({ params, searchParams }) => {
  const { locale } = params;
  const { type_id, transactionType, search, price } = searchParams;
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState(null);

  const t = useTranslations();

  const fetchProperties = async (page = 1) => {
    try {
      const queryParams = new URLSearchParams();
      if (type_id) queryParams.append('type_id', type_id);
      if (transactionType)
        queryParams.append('transactionType', transactionType);
      if (search) queryParams.append('search', search);
      if (price) queryParams.append('price', price);
      if (page) queryParams.append('page', page);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DBURL}/api/properties${
          queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`,
        {
          headers: {
            'Accept-Language': locale,
            Accept: 'application/json',
          },
        }
      );

      const result = await response.json();
      setProperties(result.data);
      setPaginationData(result.meta);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type_id || search || transactionType || price) {
      fetchProperties();
    }
  }, []);

  const handlePageChange = (event, page) => {
    fetchProperties(page);
  };

  if (loading) {
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className='py-[52px] md:py-[105px]'>
      <div className='custom_container'>
        {properties?.length > 0 ? (
          <div>
            <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-[24px]'>
              {properties?.map((property) => (
                <RealEstateCard
                  key={property?.id}
                  image={property?.image}
                  title={property?.title}
                  description={property?.address}
                  price={property?.price}
                  linkRef={`/${locale}/${
                    transactionType === 'sale' ? 'for-sale' : 'for-rent'
                  }/${property?.id}`}
                  reservation={property?.reservations_count}
                  view={property?.view_count}
                  isAvailable={property?.is_available}
                  offerType={property?.offer_type}
                />
              ))}
            </div>
            {paginationData.last_page > 1 && (
              <div className='flex items-center justify-start mt-[20px]'>
                <PaginationComponent
                  locale={locale}
                  currentPage={paginationData.current_page}
                  totalPages={paginationData.last_page}
                  handlePageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-[300px]'>
            <p className='text-center text-[18px] md:text-[22px] text-custom-gray5D font-semibold'>
              {t('SearchPage.noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
