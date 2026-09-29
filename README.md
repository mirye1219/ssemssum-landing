# 쌤씀 서비스 랜딩

> 선생님이 쓰는 보육비서, 쌤씀. 사진이나 메모로 기록을 시작하고, 알림장→관찰일지, 보육일지→주제계획안까지 초안을 이어 만드는 서비스를 소개하는 원페이지 랜딩입니다.

- 배포 URL: _(Vercel 배포 후 기입)_
- 기준 문서: `SSEMSSUM_LANDING_DESIGN_SYSTEM.md` v1.3
- 디자인 원본: 쌤씀 2026 프로토타입 Figma (Figma MCP로 Hi-fi 화면을 가져와 코드 컴포넌트로 재현)

## 기술 스택

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Pretendard

## 페이지 구성

| 순서 | 섹션 | 앵커 |
| --- | --- | --- |
| 1 | 히어로: 선생님의 오늘이, 기록의 초안이 되도록. | `#top` |
| 2 | 사용 방법: 사진·메모 → 원아 선택 → 입력 수정(선택) → 초안, 두 기록 경로 | `#how-it-works` |
| 3–4 | 주요 기능: 사진 첨부 · 알림장 · 관찰일지 · 보육일지 | `#features` |
| 5 | 더 많은 기능: 주제계획안 연결, 주간·월간 계획안 외 7종 | `#more-features` |
| 6 | 선생님의 검토: 생성 → 원아별 확인 → 수정 → 완료 | `#review` |
| 7 | 교사 설문(응답 107명) | `#survey` |
| 8 | 자주 묻는 질문 | `#faq` |
| 9 | 마지막 체험 CTA | `#start` |

## 실행

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_TRIAL_URL 에 체험 화면 주소 입력
npm run dev                  # http://localhost:3000
```

## 확인

```bash
npm run lint && npx tsc --noEmit && npm run build
```

## 환경변수

| 이름 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_TRIAL_URL` | ‘쌤씀 체험하기’ 버튼이 여는 가입 없는 체험 화면 주소. 비어 있으면 버튼이 ‘사용 방법’ 섹션으로 이동합니다. 공개 전 필수. |
| `NEXT_PUBLIC_SITE_URL` | 배포 도메인(메타데이터·sitemap). |
