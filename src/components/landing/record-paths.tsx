import { ArrowRight, BookOpen, CalendarRange, Camera, ClipboardList, NotebookPen } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Node = { icon: ReactNode; label: string; sub: string };

const START: Node = {
  icon: <Camera className="size-5" />,
  label: "사진 · 메모",
  sub: "원아 선택 → 필요하면 입력 수정",
};

const PATHS: { name: string; nodes: [Node, Node]; tone: string }[] = [
  {
    name: "원아 기록으로 이어지는 경로",
    tone: "bg-brand-050 text-brand-700",
    nodes: [
      { icon: <NotebookPen className="size-5" />, label: "알림장 초안", sub: "원아별 하루 이야기" },
      { icon: <BookOpen className="size-5" />, label: "관찰일지 초안", sub: "확인한 알림장에서 ‘관찰일지로 저장’" },
    ],
  },
  {
    name: "반 운영 기록으로 이어지는 경로",
    tone: "bg-[#FFF3E0] text-[#8A4B0F]",
    nodes: [
      { icon: <ClipboardList className="size-5" />, label: "보육일지 초안", sub: "오늘의 활동과 평가" },
      { icon: <CalendarRange className="size-5" />, label: "주제계획안 초안", sub: "보육일지를 바탕으로 다음 계획" },
    ],
  },
];

function PathNode({ node, tone, first }: { node: Node; tone?: string; first?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3 rounded-(--radius-card) border border-border-default bg-surface-base p-4",
        first && "bg-surface-cool",
      )}
    >
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", tone ?? "bg-surface-base text-ink-900 ring-1 ring-border-default")}>
        {node.icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[16px] font-bold text-ink-900">{node.label}</span>
        <span className="text-small block text-ink-600">{node.sub}</span>
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <li aria-hidden className="flex shrink-0 items-center justify-center text-brand-500 max-md:rotate-90 max-md:py-0.5">
      <ArrowRight className="size-5" />
    </li>
  );
}

export function RecordPaths({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[28px] border border-border-default bg-surface-warm p-5 md:p-8 lg:p-10", className)}>
      <h3 className="text-h2 text-ink-900">기록이 이어지는 두 경로</h3>
      <p className="text-body mt-2 text-ink-600">같은 사진과 메모에서 시작해, 필요한 문서로 초안을 이어 만들어요.</p>
      <div className="mt-8 space-y-6">
        {PATHS.map((path) => (
          <div key={path.name}>
            <p className="text-small mb-2.5 font-semibold text-ink-600">{path.name}</p>
            <ol aria-label={path.name} className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-3">
              <li className="flex flex-1">
                <PathNode node={START} first />
              </li>
              <Arrow />
              <li className="flex flex-1">
                <PathNode node={path.nodes[0]} tone={path.tone} />
              </li>
              <Arrow />
              <li className="flex flex-1">
                <PathNode node={path.nodes[1]} tone={path.tone} />
              </li>
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
