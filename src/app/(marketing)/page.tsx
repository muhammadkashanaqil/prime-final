import SideNavigation from "@/components/sections/SideNavigation";
import Hero from "@/components/sections/Hero";
import ConnectedTools from "@/components/sections/ConnectedTools";
import Work from "@/components/sections/Work";
import Ticker from "@/components/sections/Ticker";
import Services from "@/components/sections/Services";
import FeatureExplorer from "@/components/sections/FeatureExplorer";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Insights from "@/components/sections/Insights";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { getPublishedPosts } from "@/lib/cms/posts";

import { getPublishedFAQs } from "@/lib/cms/faqs";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, faqs] = await Promise.all([
    getPublishedPosts({ limit: 3 }),
    getPublishedFAQs(),
  ]);
  const selectedFaqs = [...faqs]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 5);

  return (
    <>
      <SideNavigation />
      <Hero />
      <ConnectedTools />
      <Work />
      <Ticker />
      <Services />
      <FeatureExplorer />
      <About />
      <Process />
      <Insights posts={posts} />
      <Faq faqs={selectedFaqs} />
      <Contact />
    </>
  );
}
