import { NoticeScreen } from "@/components/product/screens";
import { SECTION_IDS } from "@/config/site";
import { TrialLink } from "./cta-link";
import { Ppobo } from "./ppobo";

export function FinalCta() {
  return (
    <section id={SECTION_IDS.cta} aria-labelledby="cta-title" tabIndex={-1} className="px-3 pb-3 outline-none md:px-5 md:pb-5">
      <div className="relative overflow-hidden rounded-[32px] bg-brand-050 lg:rounded-[40px]">
        <div className="container-landing grid items-center gap-12 pt-20 lg:grid-cols-12 lg:gap-6 lg:pt-0">
          <div className="lg:col-span-6 lg:py-[128px]">
            <Ppobo state="cheer" size={72} className="-ml-2" />
            <h2 id="cta-title" className="text-h1 mt-4 text-ink-900 lg:text-[56px] lg:leading-[1.16]">
              기록의 가치는 지키고,
              <br />
              <span className="text-brand-600">작성의 부담은</span> 줄입니다.
            </h2>
            <p className="text-lead mt-6 max-w-[26em] text-ink-600">
              오늘 찍은 사진 한 장, 짧은 메모 한 줄로 첫 초안을 만들어 보세요.
            </p>
            <TrialLink className="mt-10" />
          </div>
          <div aria-hidden className="relative h-[300px] md:h-[380px] lg:col-span-6 lg:h-[560px]">
            <NoticeScreen
              state="confirmed"
              sidebar="never"
              className="absolute top-0 left-0 h-[420px] w-[640px] max-w-none rounded-b-none lg:top-[112px] lg:h-[520px] lg:w-[720px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
