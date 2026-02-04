import React from 'react';
import { useTranslations } from 'next-intl';
import GalleryDescription from '../../Components/DetailsComponents/GalleryDescription/GalleryDescription';
import ReservationForm from '../../Components/DetailsComponents/ReservationForm/ReservationForm';
import RealEstateDescription from '../../Components/DetailsComponents/RealEstateDescription/RealEstateDescription';
import RandoSection from '../../Components/DetailsComponents/RandoSection/RandoSection';
import Gallery from '../../Components/DetailsComponents/Gallery/Gallery';
import { notFound } from 'next/navigation';
import PartinersSection from '../../Components/partinersSection/PartinersSection';
import { cookies } from 'next/headers';

export async function generateMetadata({ params: { locale, id } }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DBURL}/api/properties/${id}`,
      {
        next: { revalidate: 0 },
        headers: {
          'Accept-Language': locale,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      notFound();
    }

    const { data } = await response.json();
    if (!data) {
      notFound();
    }

    return {
      title: data?.title,
      description: data?.description,
      referrer: 'origin-when-cross-origin',
      openGraph: {
        images: data?.gallery?.[0],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    notFound();
  }
}

const getRealEstateDetails = async (id, locale) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DBURL}/api/properties/${id}`,
      {
        headers: {
          'Accept-Language': locale,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      notFound();
    }

    const { data } = await response.json();
    if (!data) {
      notFound();
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
};

const relatedRealEstates = async (id, locale) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DBURL}/api/properties/related/${id}`,
      {
        headers: {
          'Accept-Language': locale,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn(
        'Failed to fetch related real estate, returning empty array.'
      );
      return [];
    }

    const resData = await response.json();
    return Array.isArray(resData.data) ? resData.data : [];
  } catch (error) {
    console.error('Error fetching related real estate:', error);
    return [];
  }
};

export default function ForSaleDetails({ params }) {
  const t = useTranslations();
  return <ForSaleDetailsContent t={t} params={params} />;
}

const ForSaleDetailsContent = async ({ t, params }) => {
  try {
    const { locale, id } = params;
    const cookieStore = cookies();
    const data = await getRealEstateDetails(id, locale);
    const randomCards = await relatedRealEstates(id, locale);
    const partnerId = cookieStore.get('selectedPartnerId')?.value;
    return (
      <section className='py-[48px]'>
        <div className='custom_container'>
          <div className='mb:[48px] md:mb-[82px] flex flex-col md:flex-row gap-x-[26px] gap-y-[32px]'>
            <div className='md:w-[50%] order-2 md:order-1 mb-[48px] md:mb-0'>
              <GalleryDescription
                data={data}
                locale={locale}
                title={t('Gallery.sale.title')}
              />
            </div>
            {data?.gallery && (
              <div className='md:w-[50%] order-1 md:order-2'>
                <Gallery data={data} />
              </div>
            )}
          </div>
          {data?.partners.length > 0 && (
            <PartinersSection
              isPage={true}
              locale={params.locale}
              data={data.partners}
            />
          )}
          <div className='flex flex-col md:flex-row gap-x-[26px] gap-y-[32px]'>
            <div className='flex-1'>
              {data?.detailed_description && (
                <div className='mb-[32px] md:mb-[75px]'>
                  <RealEstateDescription
                    desc={data.detailed_description}
                    locale={locale}
                  />
                </div>
              )}
              <ReservationForm
                data={data}
                locale={locale}
                partnerId={partnerId}
              />
            </div>
            <div className='flex-1'>
              {randomCards?.length > 0 && (
                <RandoSection
                  parentType='for-sale'
                  locale={locale}
                  data={randomCards}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
};
