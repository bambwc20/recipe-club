"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Plan = {
  id: "free" | "monthly" | "yearly";
  name: string;
  price: number;
  displayPrice: string;
  period: string;
  highlight?: boolean;
  features: string[];
  cta: string;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "무료 체험",
    price: 0,
    displayPrice: "0원",
    period: "7일",
    features: [
      "이번 주 레시피 1개 미리보기",
      "간단한 재료 정보",
      "카톡 알림 없음",
    ],
    cta: "무료로 시작",
  },
  {
    id: "monthly",
    name: "월간 구독",
    price: 9900,
    displayPrice: "9,900원",
    period: "월",
    highlight: true,
    features: [
      "매일 아침 7시 오늘의 레시피",
      "재료 쇼핑 리스트 자동 생성",
      "지난 레시피 아카이브 열람",
      "프리미엄 레시피 전체 열람",
      "카톡 알림",
    ],
    cta: "월 구독 시작",
  },
  {
    id: "yearly",
    name: "연간 구독",
    price: 99000,
    displayPrice: "99,000원",
    period: "년",
    features: [
      "월간 플랜의 모든 혜택",
      "시즌별 특별 레시피북",
      "연 2회 셰프 Q&A 라이브",
      "17% 할인 (2개월 무료)",
    ],
    cta: "연 구독 시작",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = (plan: Plan) => {
    if (plan.id === "free") {
      router.push("/signup?plan=free");
      return;
    }
    setLoading(plan.id);
    router.push(`/checkout?plan=${plan.id}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          요금제 선택
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          매일의 저녁 고민을 덜어드리는 가장 좋은 방법
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-8 ${
              plan.highlight
                ? "border-brand-500 bg-brand-50 shadow-lg ring-2 ring-brand-500"
                : "border-gray-200 bg-white shadow-sm"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white">
                가장 인기
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">
                {plan.displayPrice}
              </span>
              <span className="text-gray-600">/ {plan.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={loading === plan.id}
              className={`mt-8 w-full ${
                plan.highlight ? "btn-primary" : "btn-secondary"
              }`}
            >
              {loading === plan.id ? "이동 중..." : plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
        <p className="text-sm text-gray-600">
          💳 모든 결제는{" "}
          <span className="font-semibold text-gray-900">토스페이먼츠</span>로
          안전하게 처리됩니다.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          (이 사이트는 강의용 데모이며, 토스페이먼츠 테스트 환경으로 작동합니다.
          실제 금액이 청구되지 않습니다.)
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
