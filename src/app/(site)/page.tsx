import ExploreJourney from "@/components/Home/ExploreJourney";
import FeaturedBlog from "@/components/Home/Featuredarticle";
import HomeHero from "@/components/Home/Home-hero";
import PilgrimagePath from "@/components/Home/PilgrimagePath";
import PlanningTools from "@/components/Home/PlanningTools";
import { TrustBadges } from "@/components/Home/TrustBadges";
import VerseBand from "@/components/Home/VerseBand";
import VerseOfTheDay from "@/components/Home/VerseOfTheDay";
import WhoIsManasikFor from "@/components/Home/WhoIsManasikFor";
import WhyManasik from "@/components/Home/WhyManasik";
import ZakatCalculator from "@/components/Home/ZakatCalculator";

export default function Home() {
  return (
    <main>
      <HomeHero />
      {/* <AyahHighlightSection/> */}
      <TrustBadges/>
      <PlanningTools/>
      <FeaturedBlog/>
      <VerseOfTheDay/>
      <PilgrimagePath/>
      <WhoIsManasikFor/>
      <ExploreJourney/>
      <WhyManasik/>
    </main>
  );
}