"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChildSelectScreen, EditInputScreen, NoticeScreen, TodayRecordScreen } from "@/components/product/screens";
import { SECTION_IDS } from "@/config/site";
import { cn } from "@/lib/utils";
import { CtaLink } from "./cta-link";
import { RecordPaths } from "./record-paths";
import { SectionHeading } from "./section-heading";

type Step = { title: string; badge?: string; body: string; screen: (className?: string) => ReactNode };

const STEPS: Step[] = [
  {
    title: "사진을 고르거나 메모를 적어요",
    body: "사진 한 장, 또는 짧은 메모 하나만 있어도 시작할 수 있어요. 둘 다 있으면 더 풍부한 초안이 됩니다.",
    screen: (c) => <TodayRecordScreen photos={2} className={c} />,
  },
  {
    title: "기록할 원아를 선택해요",
    body: "오늘의 사진과 메모를 어떤 원아의 기록으로 쓸지 선생님이 직접 고릅니다.",
    screen: (c) => <ChildSelectScreen className={c} />,
  },
  {
    title: "필요하면 입력 내용을 고쳐요",
    badge: "선택",
    body: "초안을 만들기 전에 메모를 덧붙이거나 고칠 수 있어요. 그대로 두어도 괜찮아요.",
    screen: (c) => <EditInputScreen className={c} />,
  },
  {
    title: "원아별 초안이 만들어져요",
    body: "초안은 시작점일 뿐이에요. 선생님이 원아별로 읽고 수정한 뒤 확인해야 복사·다운로드할 수 있어요.",
    screen: (c) => <NoticeScreen className={c} />,
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={SECTION_IDS.howItWorks}
      aria-labelledby="how-title"
      tabIndex={-1}
      className="section-y bg-surface-base outline-none"
    >
      <div className="container-landing">
        <SectionHeading
          id="how-title"
          eyebrow="사용 방법"
          title="사진 한 장, 짧은 메모에서 시작해요."
          description="빈 문서 앞에서 고민하는 대신, 오늘 남긴 사진과 메모로 초안을 만들고 선생님은 확인과 수정에 집중해요."
        />

        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-6">
          <ol className="space-y-14 lg:motion-safe:col-span-5 lg:motion-safe:space-y-0 lg:motion-reduce:col-span-12 lg:motion-reduce:space-y-20">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={i}
                className="lg:motion-safe:flex lg:motion-safe:min-h-[72vh] lg:motion-safe:items-center lg:motion-reduce:grid lg:motion-reduce:grid-cols-12 lg:motion-reduce:items-center lg:motion-reduce:gap-6"
              >
                <div
                  className={cn(
                    "group max-w-[440px] transition-colors duration-300 lg:motion-safe:border-l-2 lg:motion-safe:pl-7 lg:motion-reduce:col-span-5",
                    active === i ? "is-active lg:motion-safe:border-brand-600" : "lg:motion-safe:border-border-default",
                  )}
                >
                  <p className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-full bg-brand-050 text-[14px] font-bold text-brand-700">
                      {i + 1}
                    </span>
                    {step.badge && (
                      <span className="rounded-(--radius-tag) border border-border-default bg-surface-base px-2 py-0.5 text-[12px] font-semibold text-ink-600">
                        {step.badge}
                      </span>
                    )}
                  </p>
                  <h3 className="text-h2 mt-4 text-ink-900 transition-colors duration-300 lg:motion-safe:text-ink-600 lg:motion-safe:group-[.is-active]:text-ink-900">
                    {step.title}
                  </h3>
                  <p className="text-body mt-3 text-ink-600">{step.body}</p>
                </div>
                <div className="mt-7 lg:motion-safe:hidden lg:motion-reduce:col-span-7 lg:motion-reduce:mt-0">
                  {step.screen("min-h-[340px]")}
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:motion-safe:col-span-7 lg:motion-safe:block">
            <div className="sticky top-[calc(var(--header-h)+56px)]">
              <div className="relative h-[520px]">
                {STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    aria-hidden={active !== i}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-[350ms] ease-out",
                      active === i ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                    )}
                  >
                    {step.screen("h-full")}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2" aria-hidden>
                {STEPS.map((s, i) => (
                  <span
                    key={s.title}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      active === i ? "w-10 bg-brand-600" : "w-4 bg-border-default",
                    )}
                  />
                ))}
                <span className="text-small ml-2 text-ink-600">
                  {active + 1} / {STEPS.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <RecordPaths className="mt-20 lg:mt-28" />

        <div className="mt-12 flex justify-center">
          <CtaLink href={`#${SECTION_IDS.features}`} variant="secondary">
            주요 기능 보기
            <ArrowDown aria-hidden className="size-[18px]" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
