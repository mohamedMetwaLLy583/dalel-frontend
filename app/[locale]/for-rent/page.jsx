import ForRentPageContent from "../Components/ForRentComponents/ForRentPageContent/ForRentPageContent";
import SearchComponent from "../Components/FilterComponent/SearchComponent";

export async function generateMetadata({ params: { locale } }) {
  const response = await fetch(
    `${(process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL)}/api/seo/rent`,
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
    title: data.title || "RealEstate",
    description: data.description,
    keywords: data.keyword,
    referrer: "origin-when-cross-origin",
  };
}

export default function ForRentPage({ params }) {
  return (
    <div>
      <div className="custom_container">
        <div className="mb-[24px] md:mb-[72px]">
          <SearchComponent locale={params.locale} transactionType="rent" />
        </div>
      </div>
      <ForRentPageContent locale={params.locale} />
    </div>
  );
}
