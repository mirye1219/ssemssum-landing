import { SECTION_IDS } from "@/config/site";
import { Ppobo } from "./ppobo";
import { SectionHeading } from "./section-heading";

/** 교사 사전 설문 결과. 서비스 사용 효과나 후기가 아니라 개발 전 현장 조사임을 함께 표기한다. */
const SURVEY = {
  respondents: 107,
  stat: 86,
  statLabel: "지난주 근무시간 밖에도 업무를 했다고 답한 교사",
  source: "쌤씀 팀의 어린이집·유치원 교사 대상 사전 설문",
};

export function Survey() {
  return (
    <section id={SECTION_IDS.survey} aria-labelledby="survey-title" tabIndex={-1} className="section-y bg-surface-base outline-none">
      <div className="container-landing">
        <SectionHeading
          id="survey-title"
          eyebrow="교사 설문"
          title="선생님이 기록에 쓰는 시간을 살펴봤어요."
          description="쌤씀을 만들기 전, 현장의 선생님들께 먼저 여쭤봤어요. 기록과 서류는 일과가 끝난 뒤에도 이어지고 있었습니다."
        />

        <figure data-reveal className="relative mt-14 overflow-hidden rounded-[28px] border border-border-default bg-surface-warm p-7 md:p-12 lg:mt-20 lg:p-16">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <p className="flex items-baseline gap-1 text-brand-600">
                <span className="text-[88px] leading-none font-extrabold tracking-[-0.05em] tabular-nums md:text-[128px] lg:text-[152px]">
                  {SURVEY.stat}
                </span>
                <span className="text-[40px] font-extrabold md:text-[56px]">%</span>
              </p>
              <p className="text-h2 mt-4 max-w-[13em] text-ink-900">{SURVEY.statLabel}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="h-3 overflow-hidden rounded-full bg-border-default" aria-hidden>
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${SURVEY.stat}%` }} />
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-(--radius-card) border border-border-default bg-surface-base p-5">
                  <dt className="text-small text-ink-600">응답자</dt>
                  <dd className="mt-1 text-[28px] font-extrabold tracking-[-0.03em] text-ink-900 tabular-nums">
                    {SURVEY.respondents}명
                  </dd>
                </div>
                <div className="rounded-(--radius-card) border border-border-default bg-surface-base p-5">
                  <dt className="text-small text-ink-600">대상</dt>
                  <dd className="mt-1 text-[17px] leading-snug font-bold text-ink-900">어린이집·유치원 교사</dd>
                </div>
              </dl>
            </div>
          </div>
          <figcaption className="text-small mt-10 border-t border-border-default pt-5 text-ink-600">
            출처: {SURVEY.source} (응답 {SURVEY.respondents}명). 쌤씀 사용 효과나 이용 후기가 아닌, 서비스 개발 전 조사
            결과입니다.
          </figcaption>
          <Ppobo state="focus" size={88} className="absolute top-6 right-6 hidden md:block lg:top-10 lg:right-10" />
        </figure>
      </div>
    </section>
  );
}
