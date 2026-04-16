# recipe-club CLAUDE.md

상위 `../../CLAUDE.md` 의 아키텍처·명령어·디자인 규칙을 모두 상속합니다. 이 파일은 recipe-club 고유 보충 사항만 기록합니다.

---

## SaaS 빌드 스킬 팩 6종

`.claude/commands/` 에 등록된 슬래시 커맨드. 수강생이 recipe-club 실습 중 바로 사용할 수 있는 Claude Code 빌트인 워크플로우.

| 커맨드 | 용도 |
|--------|------|
| `/brainstorming` | 아이디어 → 기획 구체화 |
| `/design` | UI/UX 디자인 퀵 가이드 |
| `/ship` | git + Vercel 배포 한 번에 |
| `/fix` | 에러 자동 진단 + 수정 |
| `/add-payment` | 토스페이먼츠 결제 추가 |
| `/war-room` | 전략 회의 (다각도 검토) |

> 파일 위치: `.claude/commands/*.md` (이 디렉토리 기준)

---

## B-1 Tool Policy (부트캠프 도구 정책)

| 구분 | 도구 | 비고 |
|------|------|------|
| **메인** | Claude Code (Max 구독) | 시연·실습 전부 이것으로 진행 |
| **안전망** | Antigravity Pro ($20/월) | Claude Code 장애·구독 미비 시 대체 |

- **시연은 Claude Code only** — 강사 라이브 데모는 반드시 Claude Code 사용.
- **Antigravity 사용자는 TA 옆자리 배치** — 별도 대응.
- **PDF 가이드 배부** — Antigravity 설치·기본 사용법 프린트물 제공.
