"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { generateCustomerKey, setUser } from "@/lib/auth";

function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const plan = (search.get("plan") || "free") as "free" | "monthly" | "yearly";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("올바른 이메일을 입력해주세요.");
      return;
    }
    if (name.trim().length < 2) {
      setError("이름은 2자 이상 입력해주세요.");
      return;
    }

    setLoading(true);
    setUser({
      email,
      name: name.trim(),
      plan: plan === "free" ? "free" : "none",
      customerKey: generateCustomerKey(email),
    });

    if (plan === "free") {
      router.push("/members?welcome=1");
    } else {
      router.push(`/checkout?plan=${plan}`);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
        <p className="mt-2 text-sm text-gray-600">
          {plan === "free" && "7일 무료 체험으로 시작합니다."}
          {plan === "monthly" && "월 9,900원 구독으로 시작합니다."}
          {plan === "yearly" && "연 99,000원 구독으로 시작합니다."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 card space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="홍길동"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="you@example.com"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            * 데모이므로 실제 이메일 인증은 하지 않습니다.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "이동 중..." : "계속하기"}
        </button>

        <p className="text-center text-xs text-gray-500">
          가입하면{" "}
          <Link href="#" className="underline">
            이용약관
          </Link>
          과{" "}
          <Link href="#" className="underline">
            개인정보처리방침
          </Link>
          에 동의합니다.
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-16">로딩 중...</div>}>
      <SignupForm />
    </Suspense>
  );
}
