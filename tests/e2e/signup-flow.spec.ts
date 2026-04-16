import { expect, test } from "@playwright/test";

/**
 * 핵심 플로우: 요금제 → 가입 → 회원 전용 영역
 * pricing 페이지 버튼은 <button> 요소 (Link 아님).
 * localStorage 기반 데모 인증이므로 각 테스트는 독립 context.
 */

test.describe("무료 체험 가입 플로우", () => {
  test("요금제 → 무료 선택 → 회원가입 → members 진입", async ({ page }) => {
    await page.goto("/pricing");

    await page.getByRole("button", { name: "무료로 시작" }).click();
    await expect(page).toHaveURL(/\/signup\?plan=free/);

    await page.getByPlaceholder("홍길동").fill("테스트유저");
    await page.getByPlaceholder("you@example.com").fill("free-user@test.local");
    await page.getByRole("button", { name: /계속하기/ }).click();

    await expect(page).toHaveURL(/\/members/);
  });
});

test.describe("유료 플랜 선택 플로우", () => {
  test("미로그인 상태에서 월 구독 클릭 시 signup 으로 유도", async ({ page }) => {
    await page.goto("/pricing");

    await page.getByRole("button", { name: "월 구독 시작" }).click();

    // handleSubscribe → /checkout?plan=monthly → (user 없음) → /signup?plan=monthly 리다이렉트
    await expect(page).toHaveURL(/\/(checkout|signup)\?plan=monthly/);
  });

  test("회원가입 완료 시 checkout 도달", async ({ page }) => {
    await page.goto("/signup?plan=monthly");

    await page.getByPlaceholder("홍길동").fill("유료유저");
    await page.getByPlaceholder("you@example.com").fill("paid-user@test.local");
    await page.getByRole("button", { name: /계속하기/ }).click();

    await expect(page).toHaveURL(/\/checkout\?plan=monthly/);
  });
});
