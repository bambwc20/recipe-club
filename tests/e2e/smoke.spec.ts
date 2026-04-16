import { expect, test } from "@playwright/test";

/**
 * 스모크 테스트: 모든 핵심 페이지가 200으로 뜨고 주요 텍스트가 보인다.
 * 실패하면 build는 통과했지만 런타임 깨진 상태 → 즉시 감지.
 */

test.describe("Recipe Club · 스모크", () => {
  test("랜딩 페이지 로드 + 히어로 텍스트", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/오늘의 레시피 클럽/);
    await expect(page.getByRole("heading", { name: /매일 저녁 메뉴 고민/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /7일 무료체험 시작하기/ })).toBeVisible();
  });

  test("요금제 페이지 3가지 플랜 노출", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("무료 체험").first()).toBeVisible();
    await expect(page.getByText("9,900원").first()).toBeVisible();
    await expect(page.getByText("99,000원").first()).toBeVisible();
  });

  test("회원가입 폼 노출", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: "회원가입" })).toBeVisible();
    await expect(page.getByPlaceholder("홍길동")).toBeVisible();
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
  });

  test("로그인 페이지 노출", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "로그인" })).toBeVisible();
  });

  test("구독자 전용 영역 진입 가능", async ({ page }) => {
    await page.goto("/members");
    // 비로그인 시에도 페이지는 열려야 함 (게이팅은 안내 메시지)
    await expect(page).toHaveURL(/\/members/);
  });

  test("마이페이지 진입 가능", async ({ page }) => {
    await page.goto("/mypage");
    await expect(page).toHaveURL(/\/mypage/);
  });
});
