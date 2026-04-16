"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { generateCustomerKey, getUser, setUser } from "@/lib/auth";

const PLAN_INFO = {
  monthly: {
    name: "월간 구독",
    amount: 9900,
    period: "월 1회 자동결제",
  },
  yearly: {
    name: "연간 구독",
    amount: 99000,
    period: "연 1회 자동결제",
  },
} as const;

function CheckoutInner() {
  const router = useRouter();
  const search = useSearchParams();
  const planId = (search.get("plan") || "monthly") as "monthly" | "yearly";
  const plan = PLAN_INFO[planId];

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.replace(`/signup?plan=${planId}`);
      return;
    }
    if (!user.customerKey) {
      setUser({ ...user, customerKey: generateCustomerKey(user.email) });
    }
    setReady(true);
  }, [planId, router]);

  const handleBillingAuth = async () => {
    setError(null);
    setProcessing(true);
    try {
      const user = getUser();
      if (!user || !user.customerKey) {
        throw new Error("회원 정보를 찾을 수 없습니다.");
      }

      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
      if (!clientKey) {
        throw new Error(
          "NEXT_PUBLIC_TOSS_CLIENT_KEY 환경 변수가 설정되지 않았습니다."
        );
      }

      const tossPayments = await loadTossPayments(clientKey);
      const payment = tossPayments.payment({ customerKey: user.customerKey });

      await payment.requestBillingAuth({
        method: "CARD",
        successUrl: `${window.location.origin}/checkout/success?plan=${planId}`,
        failUrl: `${window.location.origin}/checkout/fail`,
        customerEmail: user.email,
        customerName: user.name,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "결제 요청에 실패했습니다.";
      setError(msg);
      setProcessing(false);
    }
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center text-gray-500">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">구독 결제</h1>
        <p className="mt-2 text-sm text-gray-600">
          토스페이먼츠로 안전하게 처리됩니다 (테스트 환경)
        </p>
      </div>

      <div className="mt-8 card">
        <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
          <span className="text-2xl font-bold text-brand-500">
            {plan.amount.toLocaleString()}원
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600">{plan.period}</p>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>✓ 매일 아침 7시 오늘의 레시피</li>
          <li>✓ 프리미엄 레시피 전체 열람</li>
          <li>✓ 재료 쇼핑 리스트 자동 생성</li>
          <li>✓ 언제든 취소 가능</li>
        </ul>

        <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
          <p className="font-semibold">⚠️ 테스트 카드 안내</p>
          <p className="mt-1">
            토스페이먼츠 테스트 모드로 작동합니다. 어떤 카드 번호를 입력해도
            실제 결제되지 않습니다.
          </p>
          <p className="mt-1">
            예시: 4330-1234-1234-1234 · 만료 12/30 · CVC 000 · 비밀번호 00
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handleBillingAuth}
          disabled={processing}
          className="btn-primary mt-6 w-full"
        >
          {processing ? "결제창 여는 중..." : "카드 등록하고 구독 시작"}
        </button>

        <p className="mt-3 text-center text-xs text-gray-500">
          카드를 등록하면 즉시 첫 결제가 이루어집니다.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">
          ← 요금제로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-xl px-4 py-16">로딩 중...</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
