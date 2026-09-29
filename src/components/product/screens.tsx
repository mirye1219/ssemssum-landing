import { cn } from "@/lib/utils";
import {
  ArrowUp,
  Blocks,
  Check,
  ChevronDown,
  Copy,
  Leaf,
  Mic,
  Music,
  Palette,
  Plus,
  Shapes,
} from "lucide-react";
import { AppWindow, DOC_GROUPS } from "./app-window";

/* 데모 데이터: Figma 프로토타입의 가상 원아 이름을 사용한다. 실제 아동 사진은 쓰지 않고 그림 타일로 대체한다. */
export const DEMO_CHILDREN = ["김민서", "이도윤", "박하린", "최서준"] as const;
export const DEMO_MEMO = "레인메이커를 흔들며 구슬의 움직임과 소리를 반복해서 탐색했어요.";
const NOTICE_DRAFT = [
  "오늘 민서는 기다란 통 안에 구슬이 들어 있는 레인메이커를 발견하고 가까이 다가왔습니다. 레인메이커를 두 손으로 들어 올려 흔들자 구슬이 아래로 떨어지며 소리가 났고, 민서는 팔을 반복해서 움직이며 구슬의 움직임과 소리를 살펴보았습니다.",
  "구슬이 모두 내려간 뒤에는 놀잇감을 반대로 돌려 다시 소리를 듣고, 옆 친구에게도 건네며 함께 탐색해 보았습니다.",
];
const NOTICE_EDITED =
  "오늘 민서는 레인메이커의 구슬이 움직이는 모습과 소리를 반복해서 탐색했습니다. 놀잇감을 뒤집고 흔들며 소리의 변화를 경험하고, 친구에게 건네 함께 놀이하는 모습도 보였습니다.";

const TILE_STYLES = [
  { icon: Music, bg: "from-[#EDE4FB] to-[#DCCBF6]", fg: "text-brand-600" },
  { icon: Blocks, bg: "from-[#FDEBDD] to-[#F9D8BF]", fg: "text-[#B8652A]" },
  { icon: Leaf, bg: "from-[#E3F2E4] to-[#C9E6CC]", fg: "text-[#3D7A45]" },
  { icon: Palette, bg: "from-[#FDE4EC] to-[#F8CCDA]", fg: "text-[#B23E66]" },
  { icon: Shapes, bg: "from-[#E2EEFB] to-[#C8DDF5]", fg: "text-[#3A68A8]" },
];

export function PhotoTile({ index, className }: { index: number; className?: string }) {
  const s = TILE_STYLES[index % TILE_STYLES.length];
  const Icon = s.icon;
  return (
    <div
      className={cn(
        "relative flex aspect-[1.1] flex-col items-center justify-center gap-1 rounded-[10px] border border-white/60 bg-gradient-to-br",
        s.bg,
        className,
      )}
    >
      <Icon className={cn("size-[34%] max-h-8 max-w-8", s.fg)} strokeWidth={1.6} />
      <span className="text-[10px] text-[#5B5566]">사진 {index + 1}</span>
    </div>
  );
}

function Composer({ text, className }: { text?: string; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#E4E0EA] bg-white p-4 shadow-[0_6px_20px_rgba(31,24,48,0.06)]",
        className,
      )}
    >
      <p className={cn("min-h-12 text-[12.5px] leading-relaxed", text ? "text-ink-900" : "text-[#9A94A5]")}>
        {text ?? "사진이나 폴더를 넣고, 오늘의 모습을 짧게 적어 주세요."}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <Plus className="size-4 text-[#3B3645]" />
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10.5px] text-[#3B3645]">
            따뜻한 말투 <ChevronDown className="size-3" />
          </span>
          <Mic className="size-4 text-[#3B3645]" />
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-500 text-white">
            <ArrowUp className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** 02. 오늘의 기록 · 사진 첨부 (Figma 210:3) */
export function TodayRecordScreen({
  photos = 5,
  memo = DEMO_MEMO,
  className,
  sidebar,
}: {
  photos?: number;
  memo?: string;
  className?: string;
  sidebar?: "always" | "desktop" | "never";
}) {
  return (
    <AppWindow
      label={`쌤씀 오늘의 기록 화면. 사진 ${photos}장을 첨부하고 "${memo}"라는 메모를 입력한 상태`}
      title="오늘의 기록"
      className={className}
      sidebar={sidebar}
      bodyClassName="px-5 py-7 md:px-8 md:py-9"
    >
      <div className="mx-auto max-w-[560px]">
        <p className="text-[19px] font-bold tracking-[-0.02em]">오늘의 기록</p>
        <p className="mt-1 text-[12px] text-[#6F6979]">
          {photos > 0 ? `사진 ${photos}장을 바탕으로 원아별 알림장을 만들어요.` : "사진이나 짧은 메모만 남겨도 충분해요."}
        </p>
        {photos > 0 && (
          <div className="mt-5 grid grid-cols-5 gap-2 rounded-2xl border border-[#ECE8F0] bg-[#F7F6F9] p-2.5">
            {Array.from({ length: photos }, (_, i) => (
              <PhotoTile key={i} index={i} />
            ))}
          </div>
        )}
        <Composer text={memo || undefined} className="mt-3" />
      </div>
    </AppWindow>
  );
}

/** 원아 선택 단계 (Figma ChildSelector 269:129 기반) */
export function ChildSelectScreen({ className }: { className?: string }) {
  const rows = [
    { name: "김민서", info: "사진 2장 · 레인메이커", on: true },
    { name: "이도윤", info: "사진 1장 · 레인메이커", on: true },
    { name: "박하린", info: "메모 1개", on: false },
    { name: "최서준", info: "선택 안 함", on: false },
  ];
  return (
    <AppWindow
      label="원아 선택 화면. 김민서와 이도윤이 선택되어 있고, 선생님이 기록할 원아를 직접 고른다"
      title="오늘의 기록"
      className={className}
      bodyClassName="px-5 py-7 md:px-8 md:py-9"
    >
      <p className="text-[19px] font-bold tracking-[-0.02em]">원아 선택</p>
      <p className="mt-1 text-[12px] text-[#6F6979]">기록을 남길 원아를 골라 주세요.</p>
      <ul className="mt-5 space-y-2.5">
        {rows.map((r) => (
          <li
            key={r.name}
            className={cn(
              "flex items-center justify-between rounded-xl border px-4 py-3",
              r.on ? "border-brand-500 bg-brand-050" : "border-[#E4E0EA] bg-white",
            )}
          >
            <span>
              <span className="block text-[12.5px] font-semibold">{r.name}</span>
              <span className="mt-0.5 block text-[11px] text-[#6F6979]">{r.info}</span>
            </span>
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-md border",
                r.on ? "border-brand-600 bg-brand-600 text-white" : "border-[#CFC9D8] bg-white",
              )}
            >
              {r.on && <Check className="size-3.5" strokeWidth={3} />}
            </span>
          </li>
        ))}
      </ul>
    </AppWindow>
  );
}

/** 입력 내용 수정 단계 */
export function EditInputScreen({ className }: { className?: string }) {
  return (
    <AppWindow
      label="입력 내용 확인 화면. 선생님이 메모 문장을 직접 고치고 있다"
      title="오늘의 기록"
      className={className}
      bodyClassName="px-5 py-7 md:px-8 md:py-9"
    >
      <p className="text-[19px] font-bold tracking-[-0.02em]">입력 내용 확인</p>
      <p className="mt-1 text-[12px] text-[#6F6979]">필요하면 메모를 고친 뒤 초안을 만들어요.</p>
      <div className="mt-5 grid grid-cols-[88px_1fr] gap-3 rounded-2xl border border-[#E4E0EA] bg-white p-4">
        <PhotoTile index={0} />
        <div className="text-[12.5px] leading-relaxed">
          <p className="text-[11px] font-semibold text-brand-600">김민서 · 사진 2장</p>
          <p className="mt-1.5">
            레인메이커를 흔들며 구슬의 움직임과 소리를 반복해서 탐색했어요.{" "}
            <span className="rounded bg-brand-050 px-0.5 text-brand-700 underline decoration-brand-500 decoration-2 underline-offset-2">
              친구에게도 건네주었어요.
            </span>
            <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-ink-900" />
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <span className="rounded-lg bg-brand-600 px-4 py-2 text-[11.5px] font-semibold text-white">초안 만들기</span>
      </div>
    </AppWindow>
  );
}

function ChildTabs({ active = 0 }: { active?: number }) {
  return (
    <div className="mt-5 grid grid-cols-4 gap-1 rounded-xl border border-[#E4E0EA] bg-white p-1">
      {DEMO_CHILDREN.map((n, i) => (
        <span
          key={n}
          className={cn(
            "rounded-lg py-1.5 text-center text-[11.5px]",
            i === active ? "bg-brand-050 font-semibold" : "text-[#3B3645]",
          )}
        >
          {n}
        </span>
      ))}
    </div>
  );
}

/** 05/06. 원아별 알림장 결과 · 확인 완료 (Figma 210:6, 210:7) */
export function NoticeScreen({
  state = "draft",
  className,
  sidebar,
}: {
  state?: "draft" | "confirmed";
  className?: string;
  sidebar?: "always" | "desktop" | "never";
}) {
  const confirmed = state === "confirmed";
  return (
    <AppWindow
      label={
        confirmed
          ? "원아별 알림장 확인 완료 화면. 본문 복사, 다운로드, 관찰일지로 저장 버튼이 보인다"
          : "원아별 알림장 초안 화면. 김민서, 이도윤, 박하린, 최서준 탭이 있고 삭제, 다시 작성, 확인 버튼이 보인다"
      }
      title={confirmed ? "알림장" : "생성 결과"}
      groups={[
        { label: "확인 필요", items: ["미확인 결과  2"] },
        { label: "고정", items: ["이번 주 보육일지"] },
      ]}
      className={className}
      sidebar={sidebar}
      bodyClassName="px-5 py-6 md:px-7 md:py-7"
    >
      <p className="text-[19px] font-bold tracking-[-0.02em]">원아별 알림장</p>
      <p className="mt-1 text-[12px] text-[#6F6979]">이름을 선택해 내용을 확인하고 바로 수정할 수 있어요.</p>
      <ChildTabs />
      <div className="mt-3 flex flex-col rounded-2xl border border-[#E4E0EA] bg-white p-4 md:p-5">
        <div className="flex justify-between text-[10px]">
          {confirmed ? (
            <>
              <span className="font-semibold text-brand-600">확인 완료</span>
              <span className="text-[#6F6979]">2026년 8월 19일 · 김민서</span>
            </>
          ) : (
            <span className="ml-auto text-[#6F6979]">자동 저장됨</span>
          )}
        </div>
        <div className="mt-3 space-y-3 text-[12.5px] leading-[1.75]">
          {confirmed ? <p>{NOTICE_EDITED}</p> : NOTICE_DRAFT.map((p) => <p key={p.slice(0, 8)}>{p}</p>)}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-[11.5px] font-semibold">
          {confirmed ? (
            <>
              <span className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2 text-white">
                <Copy className="size-3.5" /> 본문 복사
              </span>
              <span className="rounded-lg border border-[#E4E0EA] py-2 text-center">다운로드</span>
              <span className="rounded-lg border border-brand-500 bg-brand-050 py-2 text-center text-brand-700">
                관찰일지로 저장
              </span>
            </>
          ) : (
            <>
              <span className="rounded-lg border border-[#E4E0EA] py-2 text-center text-[#D14343]">삭제</span>
              <span className="rounded-lg border border-[#E4E0EA] py-2 text-center">다시 작성</span>
              <span className="rounded-lg border border-brand-500 py-2 text-center text-brand-600">확인</span>
            </>
          )}
        </div>
      </div>
    </AppWindow>
  );
}

const DAILY_ROWS = [
  {
    time: "07:30—09:30",
    part: "등원 및\n통합보육",
    record: "보호자와 인사를 나누고 영아의 건강 상태와 수면·식사 내용을 확인함.",
    eval: "편안하게 교실로 이동할 수 있도록 안아주며 개별적으로 맞이함.",
  },
  {
    time: "09:30—10:30",
    part: "오전\n실내놀이",
    record:
      "민서는 레인메이커를 반복해서 기울이며 구슬의 움직임과 소리를 탐색함. 도윤이가 다가오자 놀잇감을 건네 함께 소리를 들어봄.",
    eval: "소리와 움직임의 관계를 반복 탐색하고 또래와 경험을 공유함. 재질이 다른 소리 도구를 추가로 제공할 예정임.",
    highlight: true,
  },
  {
    time: "10:30—10:40",
    part: "손 씻기 및\n오전간식",
    record: "손을 닦은 뒤 간식으로 제공된 밤을 제공량의 1/3 정도 먹음.",
    eval: "영아의 식사 속도와 의사를 존중하며 추가 섭취 여부를 살핌.",
  },
  {
    time: "10:40—11:20",
    part: "실내외\n놀이터 놀이",
    record: "실외에서 나뭇잎을 손으로 쥐고 펴며 촉감을 느껴봄.",
    eval: "안전하게 탐색할 수 있도록 가까이에서 상호작용함.",
  },
  {
    time: "11:30—12:30",
    part: "점심 및\n양치",
    record: "제공된 반찬의 이름을 들어보며 식사에 참여함.",
    eval: "스스로 숟가락을 잡아볼 수 있도록 기다려주고 도움을 제공함.",
  },
];

/** 08. 보육일지 · 당일 (Figma 210:9). compact 는 모바일 전용 핵심 행 크롭. */
export function DailyJournalScreen({ compact = false, className }: { compact?: boolean; className?: string }) {
  const rows = compact ? DAILY_ROWS.filter((r) => r.highlight) : DAILY_ROWS;
  return (
    <AppWindow
      label="당일 보육일지 화면. 시간, 일과, 실행 기록, 평가 및 지원 열로 된 표에 오늘의 기록이 반영되어 있다"
      title="보육일지 · 당일"
      active="docs"
      groups={[
        { label: "확인 필요", items: ["미확인 결과  2"] },
        { label: "고정", items: ["이번 주 보육일지"] },
      ]}
      className={className}
      sidebar={compact ? "never" : "desktop"}
      bodyClassName="px-4 py-6 md:px-7 md:py-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[19px] font-bold tracking-[-0.02em]">보육일지</p>
          <p className="mt-1 text-[12px] text-[#6F6979]">실제 일과 순서에 따라 실행 기록과 평가·지원을 이어서 작성해요.</p>
        </div>
        <span className="rounded-xl border border-[#E4E0EA] px-4 py-2 text-[11.5px] font-semibold">‹ 2026. 8. 19. 수 ›</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="grid grid-cols-2 gap-1 rounded-xl border border-[#E4E0EA] bg-white p-1 text-[11.5px]">
          <span className="rounded-lg bg-brand-050 px-5 py-1 text-center font-semibold">당일</span>
          <span className="px-5 py-1 text-center">주간</span>
        </span>
        <span className="rounded-lg bg-[#EAF6EC] px-3 py-1.5 text-[11px] font-semibold text-[#2F7A3D]">✓ 오늘의 기록 반영 완료</span>
      </div>
      {compact ? (
        <div className="mt-3 space-y-2">
          {rows.map((r) => (
            <div key={r.time} className="rounded-xl border border-[#D9CCF3] bg-[#F1ECFC] p-3.5 text-[12px] leading-relaxed">
              <p className="text-[10.5px] font-semibold text-brand-700">
                {r.time} · {r.part.replace("\n", " ")}
              </p>
              <p className="mt-2 text-[10px] font-semibold text-[#6F6979]">실행 기록</p>
              <p className="mt-0.5">{r.record}</p>
              <p className="mt-2 text-[10px] font-semibold text-[#6F6979]">평가 및 지원</p>
              <p className="mt-0.5">{r.eval}</p>
            </div>
          ))}
          <p className="text-[10px] text-[#6F6979]">그 외 등원·간식·실외놀이·점심 기록이 일과 순서대로 이어집니다.</p>
        </div>
      ) : (
        <div className="mt-3 overflow-hidden rounded-xl border border-[#E4E0EA] bg-white">
          <table className="w-full table-fixed border-collapse text-left text-[11px] leading-relaxed">
            <thead className="bg-[#F7F6F9] text-center text-[11px] font-semibold">
              <tr>
                <th className="w-[13%] border-b border-[#E4E0EA] py-2">시간</th>
                <th className="w-[14%] border-b border-l border-[#E4E0EA] py-2">일과</th>
                <th className="border-b border-l border-[#E4E0EA] py-2">실행 기록</th>
                <th className="w-[30%] border-b border-l border-[#E4E0EA] py-2">평가 및 지원</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.time} className={cn(r.highlight && "bg-[#F1ECFC]")}>
                  <td className="border-b border-[#ECE8F0] px-2 py-2.5 text-center text-[10px] text-[#6F6979]">{r.time}</td>
                  <td className="border-b border-l border-[#ECE8F0] px-2 py-2.5 text-center text-[10px] whitespace-pre-line">{r.part}</td>
                  <td className="border-b border-l border-[#ECE8F0] px-3 py-2.5">{r.record}</td>
                  <td className="border-b border-l border-[#ECE8F0] px-3 py-2.5">{r.eval}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-3 py-2.5 text-[10px] text-[#6F6979]">자동 저장됨 · 원본 사진은 삭제되고 파일명과 추출 정보만 기록에 연결됩니다.</p>
        </div>
      )}
    </AppWindow>
  );
}

/** 10. 관찰일지 · 생성·수정 (Figma 210:11) */
export function ObservationScreen({ className, sidebar }: { className?: string; sidebar?: "always" | "desktop" | "never" }) {
  const rows = [
    {
      k: "관찰 내용",
      v: "민서는 레인메이커를 양손으로 잡고 흔들며 구슬이 떨어지는 모습과 소리를 반복해서 살펴보았다. 놀잇감을 반대로 돌려 같은 행동을 이어가고 친구에게 건네 함께 탐색하였다.",
    },
    {
      k: "해석 및 평가",
      v: "팔을 움직여 소리를 만들고 시각적 변화와 청각적 결과를 연결하며 탐색하였다. 친구와 놀잇감을 주고받는 과정에서 또래와 놀이 경험을 공유하였다.",
    },
    {
      k: "지원 계획",
      v: "서로 다른 소리가 나는 도구를 함께 제공하고, 흔드는 방향과 속도에 따라 소리가 달라지는 경험을 확장할 수 있도록 지원한다.",
    },
  ];
  return (
    <AppWindow
      label="관찰일지 화면. 김민서의 놀이 관찰 기록이 관찰 내용, 해석 및 평가, 지원 계획으로 정리되어 있다"
      title="관찰일지"
      active="docs"
      groups={DOC_GROUPS}
      className={className}
      sidebar={sidebar}
      bodyClassName="px-5 py-6 md:px-7 md:py-7"
    >
      <p className="text-[19px] font-bold tracking-[-0.02em]">관찰일지</p>
      <p className="mt-1 text-[12px] text-[#6F6979]">알림장 내용을 바탕으로 관찰 기록을 정리했어요.</p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 rounded-xl border border-[#E4E0EA] bg-[#F7F6F9] px-4 py-3 text-[11.5px] font-semibold">
        <span>김민서</span>
        <span>2026. 8. 19</span>
        <span>놀이 관찰</span>
        <span>신체운동·건강 / 자연탐구</span>
      </div>
      <div className="mt-3 rounded-2xl border border-[#E4E0EA] bg-white p-4 md:p-5">
        <dl className="space-y-4">
          {rows.map((r) => (
            <div key={r.k} className="grid gap-1 md:grid-cols-[92px_1fr] md:gap-4">
              <dt className="text-[11.5px] font-bold">{r.k}</dt>
              <dd className="text-[12px] leading-[1.75]">{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex justify-end pt-5">
          <span className="rounded-lg border border-brand-500 px-8 py-2 text-[11.5px] font-semibold text-brand-600">저장</span>
        </div>
      </div>
    </AppWindow>
  );
}

/** 11. 주간계획안 · 생성·수정 (Figma 210:12) */
export function WeeklyPlanScreen({ className, sidebar }: { className?: string; sidebar?: "always" | "desktop" | "never" }) {
  const rows = [
    {
      k: "실내자유놀이\n09:00—10:30",
      v: ["신체·쌓기 · 교사의 손을 잡고 소리 나는 길을 따라 걸어보기", "언어 · 신체 부위와 놀잇감의 이름을 들어보기", "탐색·표현 · 레인메이커를 기울이며 구슬의 움직임과 소리 살펴보기"],
      hi: true,
    },
    { k: "전이\n10:30—10:40", v: ["교사와 눈을 맞추고 짧은 노래를 들으며 다음 일과로 이동하기"] },
    { k: "실내외 놀이터 놀이\n10:40—11:20", v: ["실외 · 바람과 주변의 소리를 느끼며 천천히 움직여보기", "실내 대체 · 색깔 천을 흔들며 움직임과 소리 탐색하기"] },
  ];
  return (
    <AppWindow
      label="0세반 주간계획안 화면. 영아의 흥미를 반영한 놀이가 일과별로 정리되어 있다"
      title="주간계획안"
      active="docs"
      groups={DOC_GROUPS}
      className={className}
      sidebar={sidebar}
      bodyClassName="px-5 py-6 md:px-7 md:py-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[19px] font-bold tracking-[-0.02em]">0세반 주간계획안</p>
          <p className="mt-1 text-[12px] text-[#6F6979]">영아의 흥미와 실제 일과를 기준으로 놀이 후보를 조합해요.</p>
        </div>
        <span className="rounded-xl border border-[#E4E0EA] px-4 py-2 text-[11px] font-semibold text-brand-600">0세 양식 ⌄</span>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-1.5 rounded-xl border border-[#E4E0EA] bg-white px-4 py-3 text-[11px] md:grid-cols-2">
        <p><span className="inline-block w-16 text-[#6F6979]">학급</span><b>병아리반</b></p>
        <p><span className="inline-block w-16 text-[#6F6979]">주요 경험</span>내 신체 부위와 소리에 관심 갖기</p>
        <p><span className="inline-block w-16 text-[#6F6979]">기간</span>2026. 8. 25—8. 29</p>
        <p><span className="inline-block w-16 text-[#6F6979]">흥미 놀이</span><b className="text-brand-600">소리와 움직임을 탐색해요</b></p>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-[#E4E0EA] bg-white text-[11px]">
        <div className="grid grid-cols-[112px_1fr] bg-[#FFF6E6] text-center font-semibold">
          <span className="py-2">일과</span>
          <span className="border-l border-[#E4E0EA] py-2">영아의 흥미를 반영한 놀이</span>
        </div>
        {rows.map((r) => (
          <div key={r.k} className={cn("grid grid-cols-[112px_1fr] border-t border-[#ECE8F0]", r.hi && "bg-[#F1ECFC]")}>
            <span className={cn("px-2 py-3 text-center text-[10.5px] whitespace-pre-line", r.hi ? "font-semibold text-brand-600" : "text-[#6F6979]")}>
              {r.k}
            </span>
            <span className="space-y-0.5 border-l border-[#ECE8F0] px-3 py-3 leading-relaxed">
              {r.v.map((t) => (
                <span key={t} className="block">{t}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}
