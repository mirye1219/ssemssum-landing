import { CoreFeatures } from "@/components/landing/core-features";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { MobileStickyCta } from "@/components/landing/mobile-sticky-cta";
import { MoreFeatures } from "@/components/landing/more-features";
import { RevealObserver } from "@/components/landing/reveal-observer";
import { ReviewFlow } from "@/components/landing/review-flow";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Survey } from "@/components/landing/survey";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="focus-ring sr-only z-50 rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <HowItWorks />
        <CoreFeatures />
        <MoreFeatures />
        <ReviewFlow />
        <Survey />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileStickyCta />
      <RevealObserver />
    </>
  );
}
