import HeroSection from './Components/HeroSection/HeroSection';
import ContactUsSection from './Components/SendReviewsSection/SendReviewsSection';
import AboutUsSection from './Components/HomeComponents/AboutUsSection/AboutUsSection';
import ForRentSection from './Components/HomeComponents/ForRentSection/ForRentSection';
import ForSaleSection from './Components/HomeComponents/ForSaleSection/ForSaleSection';
import BookOrPreviewsSection from './Components/HomeComponents/BookOrPreviewsSection/BookOrPreviewsSection';
import MarketingSteps from './Components/MarketingSteps/MarketingSteps';
import CounterSection from './Components/CounterSection/CounterSection';
import ScrollTriggerHOC from './Components/ScrollTriggerHOC/ScrollTriggerHOC';
import ChooseUsSection from './Components/ChooseUsSection/ChooseUsSection';
import TestimonialsSection from './Components/TestimonialsSection/TestimonialsSection';
import PartinersSection from './Components/partinersSection/PartinersSection';

export default function Home({ params }) {
  return (
    <div>
      <HeroSection locale={params.locale} />
      <AboutUsSection locale={params.locale} />
      <ForRentSection locale={params.locale} />
      <ForSaleSection locale={params.locale} />
      <BookOrPreviewsSection locale={params.locale} />
      <MarketingSteps locale={params.locale} />
      <ScrollTriggerHOC>
        <CounterSection locale={params.locale} />
      </ScrollTriggerHOC>
      <ChooseUsSection locale={params.locale} />
      <TestimonialsSection />
      <PartinersSection locale={params.locale} />
      <ContactUsSection locale={params.locale} />
    </div>
  );
}
