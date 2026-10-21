import ExploreJourney from "@/components/Home/ExploreJourney";
import FaqSection from "@/components/Home/Faqsection";
import FeaturedBlog from "@/components/Home/Featuredarticle";
import HomeHero from "@/components/Home/Home-hero";
import PilgrimagePath from "@/components/Home/PilgrimagePath";
import PlanningTools from "@/components/Home/PlanningTools";
import TrustStats from "@/components/Home/trust-stats";
import { TrustBadges } from "@/components/Home/TrustBadges";
import VerseOfTheDay from "@/components/Home/VerseOfTheDay";
import WhoIsManasikFor from "@/components/Home/WhoIsManasikFor";
import WhyManasik from "@/components/Home/WhyManasik";
import { tools } from "@/components/Tools/alltools";

export default function Home() {
  return (
    <main>
      <HomeHero />
      {/* <AyahHighlightSection/> */}
      <TrustBadges />
      <TrustStats toolsCount={tools.length} />
      <PlanningTools />
      <VerseOfTheDay />
      <PilgrimagePath />
      <WhoIsManasikFor />
      <ExploreJourney />
      <WhyManasik />
      <FeaturedBlog />
      <FaqSection />
    </main>
  );
}
