/**
 * 가입 없는 체험 화면 주소. 배포 환경변수 NEXT_PUBLIC_TRIAL_URL 로만 설정한다.
 * 비어 있으면 체험 버튼은 페이지 안의 사용 방법 섹션으로 안내한다(공개 전 반드시 설정).
 */
export const TRIAL_URL = process.env.NEXT_PUBLIC_TRIAL_URL?.trim() ?? "";
export const HAS_TRIAL_URL = TRIAL_URL.length > 0;

export const SITE = {
  name: "쌤씀",
  tagline: "선생님이 쓰는 보육비서, 쌤씀",
  description:
    "사진이나 메모로 오늘의 기록을 시작하세요. 알림장에서 관찰일지까지, 보육일지에서 주제계획안까지 초안을 이어 만들고 선생님이 확인·수정합니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const SECTION_IDS = {
  top: "top",
  howItWorks: "how-it-works",
  features: "features",
  more: "more-features",
  review: "review",
  survey: "survey",
  faq: "faq",
  cta: "start",
} as const;

export const NAV_ITEMS = [
  { label: "사용 방법", href: `#${SECTION_IDS.howItWorks}` },
  { label: "주요 기능", href: `#${SECTION_IDS.features}` },
  { label: "더 많은 기능", href: `#${SECTION_IDS.more}` },
  { label: "교사 설문", href: `#${SECTION_IDS.survey}` },
  { label: "자주 묻는 질문", href: `#${SECTION_IDS.faq}` },
] as const;
