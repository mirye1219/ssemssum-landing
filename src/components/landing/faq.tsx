import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SECTION_IDS } from "@/config/site";
import { TrialLink } from "./cta-link";
import { SectionHeading } from "./section-heading";

const FAQS = [
  {
    q: "사진과 메모가 둘 다 있어야 하나요?",
    a: "아니요. 사진이나 메모 중 하나만 있어도 초안을 만들 수 있어요. 사진만 있으면 사진에서 확인되는 내용을, 메모만 있으면 선생님이 적은 내용을 양식에 맞게 정리합니다. 둘 다 없을 때는 만들 수 없어요.",
  },
  {
    q: "원아는 어떻게 선택하나요?",
    a: "오늘의 사진과 메모를 넣은 뒤, 기록을 남길 원아를 선생님이 직접 골라요. 선택한 원아마다 초안이 따로 만들어지고, 이름 탭으로 한 명씩 확인할 수 있어요.",
  },
  {
    q: "만들어진 초안을 고칠 수 있나요?",
    a: "네. 초안은 화면에서 바로 수정할 수 있어요. ‘확인’을 누르면 선생님의 확인본으로 저장되고, 그때부터 복사와 다운로드를 할 수 있어요.",
  },
  {
    q: "알림장을 관찰일지로 이어서 쓸 수 있나요?",
    a: "확인을 마친 알림장에서 ‘관찰일지로 저장’을 누르면, 같은 장면을 관찰 내용·해석 및 평가·지원 계획으로 정리한 관찰일지 초안이 만들어져요. 보육일지는 주제계획안 초안으로 이어 만들 수 있어요.",
  },
  {
    q: "사진이나 메모에 없는 내용도 써주나요?",
    a: "아니요. 기록에 없는 감정이나 행동, 발달 상태를 지어내지 않아요. 정보가 부족한 항목은 비워 두니, 선생님이 알고 있는 내용으로 채워 주세요.",
  },
  {
    q: "쌤씀은 어떻게 체험해 볼 수 있나요?",
    a: "이 페이지의 ‘쌤씀 체험하기’를 누르면 가입 없이 체험 화면으로 바로 들어가요.",
  },
];

export function Faq() {
  return (
    <section id={SECTION_IDS.faq} aria-labelledby="faq-title" tabIndex={-1} className="section-y outline-none">
      <div className="container-landing grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="자주 묻는 질문" />
          <p className="text-body mt-5 text-ink-600">더 궁금한 점은 체험 화면에서 직접 확인해 보세요.</p>
          <TrialLink className="mt-8" />
        </div>
        <div className="lg:col-span-8">
          <Accordion className="border-t border-border-default">
            {FAQS.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-b border-border-default">
                <AccordionTrigger className="focus-ring min-h-[72px] items-center gap-4 rounded-none py-5 text-[18px] font-bold tracking-[-0.02em] text-ink-900 hover:no-underline focus-visible:ring-0 lg:text-[20px] **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-brand-600">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-body max-w-[44em] pb-6 text-ink-600">
                  <p>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
