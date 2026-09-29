import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import {
  DailyJournalScreen,
  NoticeScreen,
  ObservationScreen,
  TodayRecordScreen,
} from "@/components/product/screens";
import { SECTION_IDS } from "@/config/site";
import { cn } from "@/lib/utils";
import { TrialLink } from "./cta-link";
import { SectionHeading } from "./section-heading";

type Feature = {
  no: string;
  name: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
};

const FLOWS: [string, string][] = [
  ["사진 · 메모", "알림장"],
  ["알림장", "관찰일지"],
  ["사진 · 메모", "보육일지"],
];

const FEATURES: Feature[] = [
  {
    no: "01",
    name: "사진 첨부",
    title: "오늘의 사진을 기록에 담아주세요.",
    body: "휴대폰이나 PC에서 오늘 찍은 사진을 선생님이 직접 골라 첨부해요. 한 줄 메모를 곁들이면 장면이 더 분명해져요.",
    points: ["사진만, 메모만, 둘 다 모두 시작 가능", "말투를 고르고 음성으로 메모 입력"],
    visual: <TodayRecordScreen className="min-h-[360px] lg:min-h-[440px]" />,
  },
  {
    no: "02",
    name: "알림장",
    title: "원아별 하루 이야기를 초안으로.",
    body: "선택한 원아마다 알림장 초안이 만들어져요. 이름 탭을 눌러 한 명씩 읽고, 바로 고친 뒤 확인하면 됩니다.",
    points: ["원아별 탭으로 하나씩 확인", "확인 뒤에 본문 복사·다운로드"],
    visual: <NoticeScreen className="min-h-[360px] lg:min-h-[440px]" />,
  },
  {
    no: "03",
    name: "관찰일지",
    title: "알림장에서 관찰 기록으로 이어가세요.",
    body: "확인을 마친 알림장에서 ‘관찰일지로 저장’을 누르면, 같은 장면이 관찰 내용·해석 및 평가·지원 계획으로 정리된 초안이 됩니다.",
    points: ["관찰 내용 · 해석 및 평가 · 지원 계획", "초안은 선생님이 수정한 뒤 저장"],
    visual: <ObservationScreen className="min-h-[360px] lg:min-h-[440px]" />,
  },
  {
    no: "04",
    name: "보육일지",
    title: "오늘의 활동을 일지 초안으로 정리하세요.",
    body: "사진과 메모에 담긴 오늘의 활동이 일과 순서에 맞춰 실행 기록과 평가·지원 칸에 들어가요.",
    points: ["시간 · 일과 · 실행 기록 · 평가 및 지원", "당일과 주간 보기 전환"],
    visual: (
      <>
        <DailyJournalScreen className="hidden min-h-[440px] md:flex" />
        <DailyJournalScreen compact className="md:hidden" />
      </>
    ),
  },
];

function FlowChip({ from, to }: { from: string; to: string }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-base px-3.5 py-1.5 text-[14px] font-semibold text-ink-900">
      {from}
      <ArrowRight aria-hidden className="size-4 text-brand-500" />
      <span className="sr-only">에서</span>
      <span className="text-brand-600">{to}</span>
    </li>
  );
}

function FeatureRow({ feature, reverse }: { feature: Feature; reverse: boolean }) {
  const headingId = `feature-${feature.no}`;
  return (
    <article aria-labelledby={headingId} data-reveal className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
      <div className={cn("lg:col-span-5", reverse ? "lg:order-2 lg:col-start-8" : "lg:pr-8")}>
        <p className="text-small font-semibold text-brand-600">
          <span className="mr-2 text-ink-600 tabular-nums">{feature.no}</span>
          {feature.name}
        </p>
        <h3 id={headingId} className="text-h2 mt-3 text-ink-900">
          {feature.title}
        </h3>
        <p className="text-body mt-4 max-w-[28em] text-ink-600">{feature.body}</p>
        <ul className="mt-6 space-y-2.5">
          {feature.points.map((p) => (
            <li key={p} className="text-body flex items-start gap-2.5 text-ink-900">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand-600" strokeWidth={2.5} />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn("lg:col-span-7", reverse && "lg:order-1 lg:col-start-1")}>{feature.visual}</div>
    </article>
  );
}

export function CoreFeatures() {
  return (
    <section id={SECTION_IDS.features} aria-labelledby="features-title" tabIndex={-1} className="section-y outline-none">
      <div className="container-landing">
        <SectionHeading
          id="features-title"
          eyebrow="주요 기능"
          title={
            <>
              매일 쓰는 네 가지 기록,
              <br />
              각자의 화면에서 초안으로.
            </>
          }
          description="사진 첨부에서 알림장으로, 알림장에서 관찰일지로. 같은 하루가 필요한 기록으로 이어집니다."
        />

        <ul className="mt-12 flex flex-wrap gap-2 lg:mt-16" aria-label="기록 연결">
          {FLOWS.map(([from, to]) => (
            <FlowChip key={from + to} from={from} to={to} />
          ))}
        </ul>

        <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.no} feature={f} reverse={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-14 flex justify-center lg:mt-20">
          <TrialLink />
        </div>
      </div>
    </section>
  );
}
