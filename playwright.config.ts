import { defineConfig, devices } from "@playwright/test";

/**
 * Recipe Club E2E 설정
 * - CI/크론 루프에서 `npm run test:e2e` 호출 시 dev 서버 자동 기동 후 테스트
 * - 로컬 수동 실행: `npm run test:e2e:ui`
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3100",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_TOSS_CLIENT_KEY: "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm",
      TOSS_SECRET_KEY: "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6",
    },
  },
});
