"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getUser, isPaidSubscriber, User } from "@/lib/auth";
import { sampleRecipes } from "@/lib/sample-data";

function MembersInner() {
  const search = useSearchParams();
  const welcome = search.get("welcome") === "1";
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUser());
  }, []);

  if (!mounted) {
    return <div className="mx-auto max-w-6xl px-4 py-16">로딩 중...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="text-5xl">🔒</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          로그인이 필요합니다
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          구독자 전용 콘텐츠를 보려면 먼저 가입해주세요.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/signup" className="btn-primary">
            가입하기
          </Link>
          <Link href="/pricing" className="btn-secondary">
            요금제 보기
          </Link>
        </div>
      </div>
    );
  }

  const paid = isPaidSubscriber(user);
  const freeRecipes = sampleRecipes.filter((r) => !r.premium);
  const premiumRecipes = sampleRecipes.filter((r) => r.premium);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {welcome && (
        <div className="mb-8 rounded-2xl bg-brand-50 border border-brand-200 p-6 text-center">
          <h2 className="text-xl font-bold text-brand-700">
            🎉 {user.name}님, 환영합니다!
          </h2>
          <p className="mt-2 text-sm text-brand-700">
            7일 무료 체험이 시작되었습니다. 오늘의 레시피를 확인해보세요.
          </p>
        </div>
      )}

      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">구독자 전용</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
            오늘의 레시피
          </h1>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-900">{user.name}</span>님
          </p>
          <p className="mt-1">
            현재 플랜:{" "}
            <span
              className={`font-semibold ${
                paid ? "text-brand-500" : "text-gray-700"
              }`}
            >
              {user.plan === "free" && "무료 체험"}
              {user.plan === "monthly" && "월간 구독"}
              {user.plan === "yearly" && "연간 구독"}
              {user.plan === "none" && "미구독"}
            </span>
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">이번 주 레시피</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {freeRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="card hover:shadow-md transition"
            >
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-100 to-orange-200 flex items-center justify-center text-6xl">
                {recipe.emoji}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {recipe.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{recipe.summary}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>⏱ {recipe.cookTime}</span>
                <span>🔥 {recipe.difficulty}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">프리미엄 레시피</h2>
          <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
            PREMIUM
          </span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {premiumRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`card relative ${!paid ? "opacity-75" : "hover:shadow-md transition"}`}
            >
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-100 to-orange-200 flex items-center justify-center text-6xl">
                {recipe.emoji}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {recipe.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{recipe.summary}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>⏱ {recipe.cookTime}</span>
                <span>🔥 {recipe.difficulty}</span>
              </div>
              {!paid ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
                  <div className="text-3xl">🔒</div>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    유료 구독자 전용
                  </p>
                  <Link
                    href="/pricing"
                    className="btn-primary mt-3 !text-xs !px-4 !py-2"
                  >
                    구독하고 열람하기
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="absolute inset-0 rounded-2xl"
                  aria-label={recipe.title}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16">로딩 중...</div>}>
      <MembersInner />
    </Suspense>
  );
}
