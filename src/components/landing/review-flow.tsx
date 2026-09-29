import { ArrowUp, Check, FilePen, LockKeyhole, RotateCcw, Sparkles, UserCheck } from "lucide-react";
import type { ReactNode } from "react";
import { NoticeScreen } from "@/components/product/screens";
import { SECTION_IDS } from "@/config/site";
import { CtaLink } from "./cta-link";
import { SectionHeading } from "./section-heading";

const FLOW: { icon: ReactNode; name: string; body: string }[] = [
  { icon: <Sparkles className="size-5" />, name: "생성", body: "사진과 메모로 초안이 만들어져요." },
  { icon: <UserCheck className="size-5" />, name: "원아별 확인", body: "한 명씩 탭을 눌러 읽어요." },
  { icon: <FilePen className="size-5" />, name: "수정", body: "화면에서 바로 문장을 고쳐요." },
  { icon: <Check className="size-5" />, name: "완료", body: "‘확인’을 누르면 저장돼요." },
];

const RULES: { icon: ReactNode; text: string }[] = [
  { icon: <LockKeyhole className="size-4" />, text: "확인하기 전에는 복사·다운로드가 열리지 않아요." },
  { icon: <UserCheck className="size-4" />, text: "알림장은 원아마다 따로 확인해요. 한 번에 모두 확인하는 버튼은 없어요." },
  { icon: <RotateCcw className="size-4" />, text: "확인 뒤에 다시 고치면 ‘확인 필요’ 상태로 돌아가요." },
];

const STATUS = [
  { name: "김민서", state: "확인 완료", tone: "bg-brand-050 text-brand-700" },
  { name: "이도윤", state: "수정 중", tone: "bg-[#FFF3E0] text-[#8A4B0F]" },
  { name: "박하린", state: "확인 필요", tone: "bg-[#F1EFF4] text-ink-600" },
];

export function ReviewFlow() {
  return (
    <section id={SECTION_IDS.review} aria-labelledby="review-title" tabIndex={-1} className="section-y outline-none">
      <div className="container-landing grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <SectionHeading
            id="review-title"
            eyebrow="선생님의 검토"
            title={
              <>
                초안은 쌤씀이,
                <br />
                마지막 확인은 선생님이.
              </>
            }
            description="쌤씀은 빈 문서를 채울 첫 문장을 만들어요. 무엇을 남기고 어떻게 전할지는 언제나 선생님이 정합니다."
          />
          <ul className="mt-10 space-y-4">
            {RULES.map((r) => (
              <li key={r.text} className="text-body flex items-start gap-3 text-ink-900">
                <span aria-hidden className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-050 text-brand-700">
                  {r.icon}
                </span>
                {r.text}
              </li>
            ))}
          </ul>
          <CtaLink href={`#${SECTION_IDS.howItWorks}`} variant="secondary" className="mt-10">
            사용 방법 다시 보기
            <ArrowUp aria-hidden className="size-[18px]" />
          </CtaLink>
        </div>

        <div className="lg:col-span-7">
          <ol data-reveal className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {FLOW.map((f, i) => (
              <li key={f.name} className="rounded-(--radius-card) border border-border-default bg-surface-base p-4">
                <span className="flex items-center justify-between">
                  <span aria-hidden className="flex size-9 items-center justify-center rounded-xl bg-brand-050 text-brand-700">
                    {f.icon}
                  </span>
                  <span className="text-small text-ink-600 tabular-nums">{i + 1}</span>
                </span>
                <span className="mt-4 block text-[17px] font-bold text-ink-900">{f.name}</span>
                <span className="text-small mt-1 block text-ink-600">{f.body}</span>
              </li>
            ))}
          </ol>
          <div data-reveal className="relative mt-6">
            <NoticeScreen state="confirmed" className="min-h-[420px]" />
            <ul
              aria-label="원아별 확인 상태 예시"
              className="absolute -top-4 right-4 hidden w-52 space-y-1.5 rounded-2xl border border-border-default bg-surface-base p-3 shadow-[0_10px_30px_rgba(31,24,48,0.10)] md:block"
            >
              {STATUS.map((s) => (
                <li key={s.name} className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-ink-900">{s.name}</span>
                  <span className={`rounded-(--radius-tag) px-2 py-0.5 text-[12px] font-semibold ${s.tone}`}>{s.state}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
