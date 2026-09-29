"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChildSelectScreen, EditInputScreen, NoticeScreen, TodayRecordScreen } from "@/components/product/screens";
import { SECTION_IDS } from "@/config/site";
import { cn } from "@/lib/utils";
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

const INTERVAL_MS = 4000;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const go = useCallback((next: number) => {
    const n = (next + STEPS.length) % STEPS.length;
    setDir(n === (active + 1) % STEPS.length ? 1 : -1);
    setActive(n);
  }, [active]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setDir(1);
      setActive((i) => (i + 1) % STEPS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [active]);

  const step = STEPS[active];

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

        <div
          className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="lg:col-span-5">
            <p className="text-small font-semibold text-ink-600">
              {active + 1} / {STEPS.length}
            </p>
            <div className="mt-4 min-h-[168px] overflow-hidden">
              <div
                key={active}
                className={cn(
                  "animate-in fade-in duration-700 fill-mode-both motion-reduce:animate-none",
                  dir > 0 ? "slide-in-from-right-5" : "slide-in-from-left-5",
                )}
              >
                <StepCopy step={step} index={active} />
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-border-default bg-surface-base text-ink-900 hover:bg-surface-cool"
                aria-label="이전 단계"
                onClick={() => go(active - 1)}
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-border-default bg-surface-base text-ink-900 hover:bg-surface-cool"
                aria-label="다음 단계"
                onClick={() => go(active + 1)}
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
              <div className="ml-2 flex gap-1.5" role="tablist" aria-label="사용 방법 단계">
                {STEPS.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    aria-label={`${i + 1}단계. ${s.title}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      active === i ? "w-10 bg-brand-600" : "w-4 bg-border-default hover:bg-ink-600",
                    )}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="relative min-h-[360px] min-w-0 overflow-hidden lg:col-span-7 lg:min-h-[480px]"
            role="region"
            aria-label="사용 방법 화면"
          >
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  i === active
                    ? "z-10 translate-x-0 opacity-100"
                    : cn(
                        "pointer-events-none z-0 opacity-0",
                        dir > 0 ? "translate-x-8" : "-translate-x-8",
                      ),
                )}
                aria-hidden={i !== active}
              >
                {s.screen("h-full min-h-[360px] lg:min-h-[480px]")}
              </div>
            ))}
          </div>
        </div>

        <RecordPaths className="mt-14 lg:mt-16" />
      </div>
    </section>
  );
}

function StepCopy({ step, index }: { step: Step; index: number }) {
  return (
    <>
      <p className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-050 text-[14px] font-bold text-brand-700">
          {index + 1}
        </span>
        {step.badge && (
          <span className="rounded-(--radius-tag) border border-border-default bg-surface-base px-2 py-0.5 text-[12px] font-semibold text-ink-600">
            {step.badge}
          </span>
        )}
      </p>
      <h3 className="text-h2 mt-4 text-ink-900">{step.title}</h3>
      <p className="text-body mt-3 max-w-[28em] text-ink-600">{step.body}</p>
    </>
  );
}
