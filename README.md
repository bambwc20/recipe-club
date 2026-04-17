# 오늘의 레시피 클럽 (Recipe Club)

클로드코드 부트캠프의 **클론 실습 프로젝트**입니다. 매일 아침 7시 셰프가 엄선한 레시피를 보내주는 구독 SaaS를 주제로, 실제로 결제가 이루어지는 Next.js 앱을 만듭니다.

> ⚠️ 이 프로젝트는 **강의용 데모**입니다. 토스페이먼츠 테스트 환경으로 작동하며, **실제 금액은 청구되지 않습니다.**

## ✨ 포함된 기능

- ✅ Next.js 14 App Router + TypeScript + Tailwind CSS
- ✅ 랜딩 페이지 (히어로, 무료 샘플, 혜택 섹션, CTA)
- ✅ 요금제 페이지 (무료체험 / 월간 / 연간 3단계)
- ✅ 이메일 기반 가입 (localStorage)
- ✅ **토스페이먼츠 빌링(자동결제) 연동** — 카드 등록 → 빌링키 발급 → 첫 결제
- ✅ 구독자 전용 레시피 라운지 (무료 3개 + 프리미엄 3개)
- ✅ 레시피 상세 페이지 (재료·순서)
- ✅ 마이페이지 (구독 상태, 결제 내역, 해지)
- ✅ Vercel 배포 지원

## 🚀 빠른 시작

### 1. 패키지 설치

```bash
cd apps/recipe-club
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 내용 (공식 토스페이먼츠 테스트 키):

```
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm
TOSS_SECRET_KEY=test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6
```

> 이 키는 토스페이먼츠 공식 문서에서 제공하는 테스트 키로, **사업자 등록 없이도** 누구나 사용할 수 있습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:3000 접속

## 💳 결제 테스트 방법

1. `/pricing` 에서 **월 구독 시작** 클릭
2. 이메일 + 이름으로 가입
3. 체크아웃 페이지에서 **카드 등록하고 구독 시작**
4. 토스페이먼츠 결제창에서 아래 테스트 카드 입력:

| 항목 | 값 |
|---|---|
| 카드번호 | 아무 숫자 16자리 (예: `4330 1234 1234 1234`) |
| 유효기간 | 미래 날짜 (예: `12/30`) |
| CVC | `000` |
| 비밀번호 앞 2자리 | `00` |

→ 결제 성공 시 마이페이지에 **빌링키 + 결제 내역**이 기록됩니다.

## ☁️ Vercel 배포

### 1단계: GitHub에 푸시

```bash
git add .
git commit -m "feat: 오늘의 레시피 클럽 초기 버전"
git push origin main
```

### 2단계: Vercel 연결

1. https://vercel.com/new 접속
2. GitHub 저장소 Import
3. **Root Directory**: `apps/recipe-club` 로 설정 (중요!)
4. Framework Preset: `Next.js` 자동 감지

### 3단계: 환경 변수 입력

Vercel 프로젝트 설정 → Environment Variables 에서:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | `test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm` |
| `TOSS_SECRET_KEY` | `test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6` |

### 4단계: Deploy 클릭

1~2분 후 `https://your-project.vercel.app` 로 접속 가능합니다.

## 🗂 프로젝트 구조

```
apps/recipe-club/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 랜딩 페이지
│   │   ├── layout.tsx                  # 공통 헤더/푸터
│   │   ├── globals.css                 # Tailwind 전역 스타일
│   │   ├── pricing/page.tsx            # 요금제
│   │   ├── signup/page.tsx             # 회원가입
│   │   ├── checkout/
│   │   │   ├── page.tsx                # 결제창 호출
│   │   │   ├── success/page.tsx        # 결제 성공 (authKey → billingKey)
│   │   │   └── fail/page.tsx           # 결제 실패
│   │   ├── members/page.tsx            # 구독자 전용 레시피 목록
│   │   ├── recipes/[id]/page.tsx       # 레시피 상세
│   │   ├── mypage/page.tsx             # 구독/결제 관리
│   │   └── api/
│   │       └── billing/
│   │           └── confirm/route.ts    # 빌링키 발급 + 첫 결제 승인
│   └── lib/
│       ├── auth.ts                     # localStorage 기반 인증 (데모용)
│       └── sample-data.ts              # 샘플 레시피 6개
├── .env.example
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## 🔑 토스페이먼츠 연동 흐름

```
[사용자]                  [Next.js 클라이언트]         [Next.js API]           [토스페이먼츠]
   │                             │                          │                       │
   ├──요금제 선택───────────▶    │                          │                       │
   │                             │──requestBillingAuth()────┼──────────────────────▶│
   │                             │                          │        결제창 오픈    │
   ◀────────────────────────────────────────── 카드 정보 입력 ──────────────────────│
   │                             │                          │                       │
   │                             ◀──── successUrl + authKey──┼───────────────────────│
   │                             │                          │                       │
   │                             │──POST /api/billing/confirm ▶                      │
   │                             │                          │──issue billingKey────▶│
   │                             │                          │◀──billingKey──────────│
   │                             │                          │──첫 자동결제 요청────▶│
   │                             │                          │◀──payment 성공────────│
   │                             ◀── 마이페이지로 이동 ──────│                       │
```

## 📚 강의 연계

이 프로젝트는 **1일 오프라인 부트캠프(8.5시간, 10:00~18:30)** 동안 Claude Code와 함께 처음부터 끝까지 만들어봅니다:

1. **Part 0 (10:30–12:00)** — 컴퓨터 기초, Claude Code 설치, 프로젝트 클론
2. **Part 1 (13:00–14:00)** — 뼈대 이해 + 첫 커스텀
3. **Part 2 (14:00–15:00)** — 내 서비스로 탈바꿈
4. **Part 3 (15:15–16:15)** — MCP + 토스페이먼츠 결제 연동 (오늘의 핵심 🔥)
5. **Part 4 (16:15–17:00)** — Vercel 배포 + 본인 URL 확보
6. **Part 5 (17:00–17:30)** — 실결제 전환 로드맵 + 쇼케이스

## 🧪 E2E 테스트 (Playwright)

Vercel 배포 전 스모크 체크용. 크론 루프가 매 회차마다 자동 실행합니다.

```bash
# 최초 1회: 브라우저 설치
npx playwright install chromium

# 전체 실행 (로컬 빌드 서버 자동 기동)
npm run test:e2e:ci

# 인터랙티브 UI 모드
npm run test:e2e:ui
```

커버 범위:
- **smoke.spec.ts** — 6개 주요 페이지 렌더링
- **signup-flow.spec.ts** — 무료/유료 플로우 3종
- **billing-api.spec.ts** — `/api/billing/confirm` 입력 검증 + 토스 API 연동 에러 전파

## 🆘 문제 해결

**Q. 결제창이 안 열려요.**
→ `.env.local` 의 `NEXT_PUBLIC_TOSS_CLIENT_KEY` 가 설정되었는지 확인하고 `npm run dev` 재시작.

**Q. "빌링키 발급 실패" 오류가 나와요.**
→ `TOSS_SECRET_KEY` 가 서버 사이드에 주입되었는지 확인. Vercel 배포 시 Environment Variables 에 입력했는지 체크.

**Q. Vercel 배포 후 404 가 떠요.**
→ Vercel 프로젝트 설정의 **Root Directory** 를 `apps/recipe-club` 로 지정했는지 확인.

---

© 2026 클로드코드 부트캠프 — 강의용 데모 프로젝트
