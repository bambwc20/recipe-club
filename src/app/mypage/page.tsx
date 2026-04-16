"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getPayments,
  getUser,
  logout,
  PaymentRecord,
  updateUser,
  User,
} from "@/lib/auth";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUser());
    setPayments(getPayments());
  }, []);

  const handleLogout = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      logout();
      router.push("/");
    }
  };

  const handleCancelSubscription = () => {
    if (
      !confirm(
        "정말 구독을 해지하시겠습니까?\n(데모이므로 실제 토스 API 호출은 하지 않습니다)"
      )
    )
      return;
    updateUser({ plan: "none", billingKey: undefined });
    setUser(getUser());
    alert("구독이 해지되었습니다.");
  };

  if (!mounted) {
    return <div className="mx-auto max-w-4xl px-4 py-16">로딩 중...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="text-5xl">👤</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          로그인이 필요합니다
        </h1>
        <div className="mt-6">
          <Link href="/signup" className="btn-primary">
            가입하기
          </Link>
        </div>
      </div>
    );
  }

  const planLabel: Record<User["plan"], string> = {
    none: "미구독",
    free: "7일 무료 체험",
    monthly: "월간 구독 (9,900원)",
    yearly: "연간 구독 (99,000원)",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">마이페이지</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {user.name}님
          </h1>
          <p className="mt-1 text-sm text-gray-600">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          로그아웃
        </button>
      </div>

      <section className="mt-8 card">
        <h2 className="text-lg font-bold text-gray-900">구독 정보</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">현재 플랜</span>
            <span className="font-semibold text-gray-900">
              {planLabel[user.plan]}
            </span>
          </div>
          {user.subscribedAt && (
            <div className="flex justify-between">
              <span className="text-gray-600">구독 시작</span>
              <span className="text-gray-900">
                {new Date(user.subscribedAt).toLocaleString("ko-KR")}
              </span>
            </div>
          )}
          {user.billingKey && (
            <div className="flex justify-between">
              <span className="text-gray-600">결제 수단</span>
              <span className="text-gray-900">카드 자동결제 등록됨</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {user.plan === "none" && (
            <Link href="/pricing" className="btn-primary">
              구독 시작하기
            </Link>
          )}
          {user.plan === "free" && (
            <Link href="/pricing" className="btn-primary">
              유료 플랜으로 업그레이드
            </Link>
          )}
          {(user.plan === "monthly" || user.plan === "yearly") && (
            <button
              onClick={handleCancelSubscription}
              className="btn-secondary"
            >
              구독 해지
            </button>
          )}
          <Link href="/members" className="btn-secondary">
            레시피 보러가기
          </Link>
        </div>
      </section>

      <section className="mt-8 card">
        <h2 className="text-lg font-bold text-gray-900">결제 내역</h2>
        {payments.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            아직 결제 내역이 없습니다.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-gray-100">
            {payments.map((p) => (
              <div
                key={p.paymentKey}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-gray-900">{p.orderName}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {new Date(p.approvedAt).toLocaleString("ko-KR")} · {p.method}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {p.amount.toLocaleString()}원
                  </p>
                  <p className="mt-0.5 text-xs text-green-600">승인 완료</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}
