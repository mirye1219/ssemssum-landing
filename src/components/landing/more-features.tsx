import {
  ArrowRight,
  CalendarDays,
  CalendarRange,
  ClipboardList,
  FileCog,
  MessagesSquare,
  NotebookText,
  Palette,
  PenLine,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { WeeklyPlanScreen } from "@/components/product/screens";
import { SECTION_IDS } from "@/config/site";
import { TrialLink } from "./cta-link";
import { SectionHeading } from "./section-heading";

const TOOLS: { icon: ReactNode; name: string; body: string }[] = [
  {
    icon: <CalendarDays className="size-5" />,
    name: "월간 계획안",
    body: "한 달의 주제와 놀이 흐름을 월간 계획안 초안으로 정리해요.",
  },
  {
    icon: <MessagesSquare className="size-5" />,
    name: "상담 준비와 답변",
    body: "면담 전 질문과 사전 작성본, 부모님의 사전 질문에 대한 답변 초안을 준비해요.",
  },
  {
    icon: <NotebookText className="size-5" />,
    name: "원아 메모",
    body: "원아를 골라 메모를 남기거나 음성으로 입력해 두면, 이후 기록에 참고할 수 있어요.",
  },
  {
    icon: <Users className="size-5" />,
    name: "반과 원아 관리",
    body: "담당 반과 원아를 등록하고 학년도에 맞춰 관리해요.",
  },
  {
    icon: <FileCog className="size-5" />,
    name: "원내 양식 설정",
    body: "우리 원에서 쓰는 양식을 등록하면 그 양식에 맞춰 초안을 만들어요.",
  },
  {
    icon: <PenLine className="size-5" />,
    name: "문체 선택",
    body: "‘따뜻한 말투’처럼 원하는 문체를 골라 초안의 어조를 맞춰요.",
  },
  {
    icon: <Palette className="size-5" />,
    name: "아뜰리에 제작",
    body: "주제와 사진을 골라 게시물 초안을 만들고 직접 다듬어요.",
  },
];

export function MoreFeatures() {
  return (
    <section
      id={SECTION_IDS.more}
      aria-labelledby="more-title"
      tabIndex={-1}
      className="section-y bg-surface-cool outline-none"
    >
      <div className="container-landing">
        <SectionHeading
          id="more-title"
          eyebrow="더 많은 기능"
          title={
            <>
              기록을 넘어,
              <br />
              선생님의 하루에
              <br className="sm:hidden" /> 이어지는 도구들
            </>
          }
          description="매일의 기록이 계획과 상담 준비로 이어지도록, 필요한 도구를 한곳에 모았어요."
        />

        <div data-reveal className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12">
          <article
            aria-labelledby="tool-theme-plan"
            className="flex flex-col justify-between rounded-(--radius-card) border border-border-default bg-surface-base p-6 md:p-8 lg:col-span-5"
          >
            <div>
              <p className="flex flex-wrap items-center gap-2 text-[14px] font-semibold text-ink-900">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF3E0] px-3 py-1 text-[#8A4B0F]">
                  <ClipboardList aria-hidden className="size-4" /> 보육일지
                </span>
                <ArrowRight aria-hidden className="size-4 text-brand-500" />
                <span className="sr-only">에서</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-050 px-3 py-1 text-brand-700">
                  <CalendarRange aria-hidden className="size-4" /> 주제계획안
                </span>
              </p>
              <h3 id="tool-theme-plan" className="text-h2 mt-6 text-ink-900">
                쌓인 보육일지가
                <br />
                다음 계획의 초안으로
              </h3>
              <p className="text-body mt-4 text-ink-600">
                보육일지에 기록된 활동과 영아의 흥미를 바탕으로 주제계획안 초안을 이어 만들어요. 주간 계획안도 같은
                흐름으로 놀이 후보를 조합합니다.
              </p>
            </div>
            <p className="text-small mt-8 text-ink-600">연령을 바꾸면 해당 연령의 계획안 표로 전환돼요.</p>
          </article>

          <div className="lg:col-span-7">
            <p className="text-small mb-3 font-semibold text-ink-600">주간 계획안</p>
            <WeeklyPlanScreen className="min-h-[420px]" />
          </div>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="그 밖의 기능">
          {TOOLS.map((tool) => (
            <li
              key={tool.name}
              data-reveal
              className="rounded-(--radius-card) border border-border-default bg-surface-base p-6"
            >
              <span aria-hidden className="flex size-10 items-center justify-center rounded-xl bg-brand-050 text-brand-700">
                {tool.icon}
              </span>
              <h3 className="mt-5 text-[18px] font-bold tracking-[-0.02em] text-ink-900">{tool.name}</h3>
              <p className="text-body mt-2 text-ink-600">{tool.body}</p>
            </li>
          ))}
          <li className="flex flex-col justify-between rounded-(--radius-card) bg-brand-600 p-6 text-white sm:col-span-2 lg:col-span-1">
            <p className="text-[18px] leading-snug font-bold tracking-[-0.02em]">
              직접 써보면
              <br />
              더 빨리 이해돼요.
            </p>
            <TrialLink
              size="sm"
              className="mt-6 self-start bg-white text-brand-700 hover:bg-brand-050 active:bg-brand-050"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
