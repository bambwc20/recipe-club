"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateCustomerKey, getUser, setUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [existingName, setExistingName] = useState<string | null>(null);

  useEffect(() => {
    const current = getUser();
    if (current) setExistingName(current.name);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("올바른 이메일을 입력해주세요.");
      return;
    }

    const current = getUser();
    // 데모용: 이전에 저장된 유저와 이메일이 같으면 그대로 복구
    if (current && current.email === email) {
      router.push("/mypage");
      return;
    }

    // 새 이메일이면 임시 계정 생성 (데모이므로 비밀번호 없음)
    setUser({
      email,
      name: email.split("@")[0],
      plan: "none",
      customerKey: generateCustomerKey(email),
    });
    router.push("/pricing");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
        <p className="mt-2 text-sm text-gray-600">
          이메일만 입력하면 됩니다. (데모이므로 비밀번호 없음)
        </p>
      </div>

      {existingName && (
        <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-brand-900">
          이미 <b>{existingName}</b> 님으로 로그인되어 있어요.{" "}
          <Link href="/mypage" className="underline">
            마이페이지 →
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 card space-y-5">
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
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary w-full">
          로그인
        </button>

        <p className="text-center text-xs text-gray-500">
          계정이 없나요?{" "}
          <Link href="/pricing" className="underline">
            요금제 보러가기
          </Link>
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
