import { expect, test } from "@playwright/test";

/**
 * /api/billing/confirm 서버 라우트가 잘못된 입력에 대해
 * 토스페이먼츠 에러를 정상적으로 전파하는지 검증.
 * 실제 결제 성공 케이스는 브라우저 내 토스 UI 때문에 E2E 스코프 밖.
 */

test.describe("Billing API 라우트", () => {
  test("필수 파라미터 누락 시 400 반환", async ({ request }) => {
    const res = await request.post("/api/billing/confirm", {
      data: {},
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toContain("필수 파라미터");
  });

  test("가짜 authKey로 호출 시 토스에서 거절", async ({ request }) => {
    const res = await request.post("/api/billing/confirm", {
      data: {
        authKey: "fake_auth_key_for_test",
        customerKey: "cust_e2e_test",
        amount: 9900,
        orderName: "월간 구독",
        customerEmail: "e2e@test.local",
        customerName: "E2E",
      },
    });

    // 토스 API가 실제로 호출되고 거절됨 → 4xx/5xx
    expect(res.ok()).toBe(false);
    const body = await res.json();
    expect(body.message).toBeTruthy();
  });
});
