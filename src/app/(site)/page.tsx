import ExploreJourney from "@/components/Home/ExploreJourney";
import FeaturedBlog from "@/components/Home/Featuredarticle";
import HomeHero from "@/components/Home/Home-hero";
import { TrustBadges } from "@/components/Home/TrustBadges";
import WhyManasik from "@/components/Home/WhyManasik";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <TrustBadges/>
      <FeaturedBlog/>
      <ExploreJourney/>
      <WhyManasik/>
    </main>
  );
}