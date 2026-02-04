import React from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from '../SectionTitle/SectionTitle';
import TestimonialsSwiper from '../HomeComponents/TestimonialsSwiper/TestimonialsSwiper';
import PartinerSwiper from '../HomeComponents/PartinersSwiper/PartinerSwiper';

const getPartiners = async (locale) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/partner`, {
      headers: {
        'Accept-Language': locale,
        Accept: 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw Error('Failed To Fetch Data');
    }

    const data = await res.json();

    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export default function PartinersSection({ locale, isPage, data }) {
  const t = useTranslations();
  return (
    <>
      <PartinersSectionContent
        t={t}
        locale={locale}
        isPage={isPage}
        data={data}
      />
    </>
  );
}

const PartinersSectionContent = async ({ t, locale, isPage, data }) => {
  try {
    const partiners = await getPartiners(locale);
    return (
      partiners &&
      partiners.length > 0 && (
        <section
          className={`py-[24px] md:py-[52px] relative overflow-x-hidden`}
        >
          <div className='custom_container'>
            {isPage === true ? (
              <SectionTitle
                title={t('partinersSection.title')}
                description={t('partinersSection.description')}
              />
            ) : (
              <SectionTitle
                title={t('partners.title')}
                description={t('partners.desc')}
              />
            )}
            <PartinerSwiper cards={partiners} isPage={isPage} data={data} />
          </div>
        </section>
      )
    );
  } catch (error) {
    console.log(error);
  }
};
