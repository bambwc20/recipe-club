import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "오늘의 레시피 클럽 | 매일 저녁 메뉴 고민 끝",
  description:
    "셰프가 엄선한 오늘의 레시피를 매일 아침 7시에 받아보세요. 재료 쇼핑 리스트까지.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%8D%B3%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-40">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <span className="text-lg font-bold text-gray-900">
                오늘의 레시피 클럽
              </span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/#features"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                특징
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                요금제
              </Link>
              <Link
                href="/members"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                구독자 전용
              </Link>
              <Link
                href="/mypage"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                마이페이지
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                로그인
              </Link>
            </nav>
            <Link href="/pricing" className="btn-primary !py-2 !px-4 !text-sm hidden sm:inline-flex">
              지금 구독하기
            </Link>
            <MobileNav />
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50 py-10 mt-20">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
            <p>© 2026 오늘의 레시피 클럽 — 클로드코드 부트캠프 클론 프로젝트</p>
            <p className="mt-2">
              이 사이트는 강의용 데모이며, 실제 결제는 토스페이먼츠 테스트
              환경으로 작동합니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
