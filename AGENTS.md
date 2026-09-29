<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 쌤씀 랜딩 · 작업 규칙

기준 문서: `SSEMSSUM_LANDING_DESIGN_SYSTEM.md` v1.3. 제품 원본: [쌤씀 2026 프로토타입 Figma](https://www.figma.com/design/pRfg784RpG9Q5wiCxiS1EQ) (Hi-fi 210:2~210:13).

## 기술 스택

- Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui(base-ui 기반: Accordion, Sheet).
- 글꼴은 `pretendard` 패키지의 dynamic-subset CSS를 `layout.tsx`에서 불러온다.

## 폴더 구조

- `src/config/site.ts`: 체험 주소(`NEXT_PUBLIC_TRIAL_URL`), 섹션 ID, 메뉴. 섹션 순서·앵커는 여기서만 바꾼다.
- `src/components/landing/*`: 랜딩 섹션. 순서는 `src/app/page.tsx`.
- `src/components/product/*`: Figma 제품 화면을 코드로 재현한 목업. 캡처 이미지 대신 이 컴포넌트를 쓴다.
- `design/figma/*`: Figma MCP로 받은 참고 캡처(배포에 포함되지 않음).

## 디자인 토큰

- 색·반경·그림자는 `globals.css`의 `@theme` 토큰만 쓴다: `brand-050/200/500/600/700`, `surface-base/warm/cool`, `ink-900/600`, `border-default`, `focus-ring`.
- 작은 글씨가 올라가는 버튼 배경은 `brand-600`(hover `brand-700`). `brand-500` 위 흰 작은 글씨 금지. `brand-200`은 본문 텍스트에 쓰지 않는다.
- 타이포는 `text-display / text-h1 / text-h2 / text-lead / text-body / text-small` 유틸리티를 쓴다.
- 제품 화면에만 `shadow-product`, 일반 카드는 경계선 중심.

## 카피·콘텐츠 규칙

- 브랜드명은 쌤씀, 캐릭터는 뽀뽀. 뽀뽀는 히어로 가장자리·전환 장면·마지막 CTA에만 작게 쓰고 `public/ppobo` 원본만 쓴다.
- 금지 표현: “교사를 대신한다”, “자동으로 완성된다”, 검증되지 않은 절약 시간·정확도, 출시 예정·대기 신청, 가격·요금제.
- 모든 결과는 “초안 생성 → 선생님 확인·수정”으로 쓴다. 사진 첨부에 얼굴 인식·자동 분류를 섞지 않는다.
- 실제 아동 사진·이름 금지. Figma 데모 이름(김민서·이도윤·박하린·최서준)과 그림 타일만 쓴다.
- 설문 수치는 출처·모수(교사 대상 사전 설문, 응답 107명)를 함께 표기하고 사용 효과처럼 쓰지 않는다.

## 접근성·움직임

- 스크롤 연출은 ‘사용 방법’ 한 곳만. `prefers-reduced-motion`에서는 고정 연출 없이 단계별 정적 화면을 보여준다.
- 제품 목업은 `role="img"` + `aria-label`로 한 장의 그림으로 읽히게 하고, 안에 포커스 가능한 요소를 두지 않는다.
- 섹션은 `tabIndex={-1}`, 앵커 이동 시 포커스를 섹션으로 옮긴다.

## 확인 명령

- `npm run lint`, `npx tsc --noEmit`, `npm run build`가 모두 통과해야 커밋한다.
