import ExploreJourney from "@/components/Home/ExploreJourney";
import FeaturedBlog from "@/components/Home/Featuredarticle";
import HomeHero from "@/components/Home/Home-hero";
import PilgrimagePath from "@/components/Home/PilgrimagePath";
import { TrustBadges } from "@/components/Home/TrustBadges";
import WhoIsManasikFor from "@/components/Home/WhoIsManasikFor";
import WhyManasik from "@/components/Home/WhyManasik";

export default function Home() {
  return (
    <main>
      <HomeHero />
      {/* <AyahHighlightSection/> */}
      <TrustBadges/>
      <FeaturedBlog/>
      <WhoIsManasikFor/>
      <ExploreJourney/>
      <WhyManasik/>
      <PilgrimagePath/>
    </main>
  );
}