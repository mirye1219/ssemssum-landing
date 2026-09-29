import { SECTION_IDS, SITE } from "@/config/site";
import { TodayRecordScreen } from "@/components/product/screens";
import { CtaLink, TrialLink } from "./cta-link";
import { Ppobo } from "./ppobo";
import { Eyebrow } from "./section-heading";

export function Hero() {
  return (
    <section
      id={SECTION_IDS.top}
      aria-labelledby="hero-title"
      tabIndex={-1}
      className="relative overflow-hidden pt-[112px] pb-20 outline-none lg:pt-[152px] lg:pb-[128px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 -right-40 h-[640px] w-[860px] rounded-full bg-[radial-gradient(closest-side,#EFE5FB_0%,rgba(243,236,252,0.6)_45%,transparent_100%)] lg:-right-20"
      />
      <div className="container-landing relative grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <Eyebrow>{SITE.tagline}</Eyebrow>
          <h1 id="hero-title" className="text-display mt-5 text-ink-900">
            선생님의 오늘이,
            <br />
            <span className="text-brand-600">기록의 초안</span>이
            <br className="hidden sm:inline" /> 되도록.
          </h1>
          <p className="text-lead mt-6 max-w-[30em] text-ink-600">
            사진이나 메모로 오늘의 기록을 시작하세요. 알림장에서 관찰일지까지, 보육일지에서 주제계획안까지 초안을
            이어 만들고 선생님이 확인·수정합니다.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <TrialLink />
            <CtaLink href={`#${SECTION_IDS.howItWorks}`} variant="secondary">
              어떻게 쓰는지 보기
            </CtaLink>
          </div>
          <p className="text-small mt-5 text-ink-600">가입 없이 바로 체험 화면을 열어볼 수 있어요.</p>
        </div>

        <div className="relative lg:col-span-7 lg:-mr-[max(40px,calc((100vw-1200px)/2))]">
          <TodayRecordScreen className="min-h-[380px] lg:min-h-[500px] lg:rounded-r-none" />
          <div className="absolute -bottom-6 left-4 flex items-center gap-2 rounded-2xl border border-border-default bg-surface-base py-2 pr-4 pl-2 shadow-[0_10px_30px_rgba(31,24,48,0.10)] md:left-[200px] lg:-bottom-8">
            <Ppobo state="happy" size={44} />
            <p className="text-[13px] leading-snug font-semibold text-ink-900">
              초안을 만들면,
              <br />
              <span className="text-brand-600">선생님이 확인·수정해요</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
