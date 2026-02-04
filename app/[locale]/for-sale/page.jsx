import SearchComponent from "../Components/FilterComponent/SearchComponent";
import ForSalePageContent from "../Components/ForSaleComponents/ForRentPageContent/ForSalePageContent";

export async function generateMetadata({ params: { locale } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/seo/sale`,
    {
      next: { revalidate: 0 },
      headers: {
        "Accept-Language": locale,
        Accept: "application/json",
      },
    }
  );
  const res = await response.json();
  const data = res.data;
  return {
    title: data.title || "Elsqoor",
    description: data.description,
    keywords: data.keyword,
    referrer: "origin-when-cross-origin",
  };
}
export default function page({ params }) {
  return (
    <div>
      <div className="custom_container">
        <div className="mb-[24px] md:mb-[72px]">
          <SearchComponent locale={params.locale} transactionType="sale" />
        </div>
      </div>
      <ForSalePageContent locale={params.locale} />
    </div>
  );
}
