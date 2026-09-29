import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Image as ImageIcon,
  ListChecks,
  PanelLeft,
  PanelRight,
  Plus,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";

type NavKey = "today" | "docs" | "photo";

type SidebarGroup = { label: string; items: string[] };

const DEFAULT_GROUPS: SidebarGroup[] = [
  { label: "확인 필요", items: ["원아 연결 확인  2"] },
  { label: "최근", items: ["김민서 알림장"] },
];

export const DOC_GROUPS: SidebarGroup[] = [
  { label: "일지·계획", items: ["관찰일지", "보육일지", "주간계획안", "면담일지"] },
];

type AppWindowProps = {
  /** 스크린리더용 화면 설명. 제품 화면은 하나의 그림으로 읽힌다. */
  label: string;
  title: string;
  active?: NavKey;
  groups?: SidebarGroup[];
  /** 좁은 폭에서는 사이드바를 숨겨 본문 크롭만 보여준다. */
  sidebar?: "always" | "desktop" | "never";
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

export function AppWindow({
  label,
  title,
  active = "today",
  groups = DEFAULT_GROUPS,
  sidebar = "desktop",
  className,
  bodyClassName,
  children,
}: AppWindowProps) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={cn(
        "relative flex overflow-hidden rounded-(--radius-product) border border-border-default bg-surface-base text-[13px] text-ink-900 shadow-product select-none",
        className,
      )}
    >
      {sidebar !== "never" && (
        <Sidebar
          active={active}
          groups={groups}
          className={sidebar === "desktop" ? "hidden md:flex" : "flex"}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#ECE8F0] px-5">
          <span className="text-[12px] font-semibold">{title}</span>
          <span className="flex items-center gap-3 text-[#5B5566]" aria-hidden>
            <ListChecks className="size-3.5" />
            <PanelRight className="size-3.5" />
          </span>
        </div>
        <div className={cn("relative flex-1", bodyClassName)}>{children}</div>
      </div>
    </figure>
  );
}

function Sidebar({
  active,
  groups,
  className,
}: {
  active: NavKey;
  groups: SidebarGroup[];
  className?: string;
}) {
  const nav: { key: NavKey; label: string; icon: ReactNode }[] = [
    { key: "today", label: "오늘의 기록", icon: <Plus className="size-3.5" /> },
    { key: "docs", label: "문서함", icon: <FileText className="size-3.5" /> },
    { key: "photo", label: "사진 제작실", icon: <ImageIcon className="size-3.5" /> },
  ];
  return (
    <div
      aria-hidden
      className={cn(
        "w-[168px] shrink-0 flex-col border-r border-[#ECE8F0] bg-[#F7F6F9] px-2.5 py-3 lg:w-[184px]",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-4 pb-3 text-[#7A7485]">
        <PanelLeft className="size-3" />
        <ChevronLeft className="size-3" />
        <ChevronRight className="size-3" />
      </div>
      <div className="flex items-center justify-between px-1 pb-3">
        <span className="text-[15px] font-extrabold tracking-[-0.03em]">쌤씀</span>
        <span className="flex items-center gap-2 text-[#5B5566]">
          <Search className="size-3" />
          <span className="relative">
            <Bell className="size-3" />
            <span className="absolute -top-0.5 -right-0.5 size-1 rounded-full bg-[#E5484D]" />
          </span>
        </span>
      </div>
      <ul className="space-y-0.5">
        {nav.map((item) => (
          <li
            key={item.key}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-2 text-[11.5px]",
              item.key === active ? "bg-brand-050 font-semibold" : "text-[#3B3645]",
            )}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
      {groups.map((g) => (
        <div key={g.label} className="mt-4 px-2">
          <p className="pb-1.5 text-[9.5px] text-[#6F6979]">{g.label}</p>
          <ul className="space-y-2 text-[11px] text-[#3B3645]">
            {g.items.map((i) => (
              <li key={i} className="whitespace-pre">
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-between rounded-lg bg-[#EEECF1] px-2.5 py-2.5 text-[10.5px]">
        <span className="flex items-center gap-2">
          <span className="text-[9px] font-semibold text-brand-500">M</span>
          미림 선생님
        </span>
        <CircleHelp className="size-3 text-[#5B5566]" />
      </div>
    </div>
  );
}
