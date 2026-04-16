"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, isPaidSubscriber, isSubscribed, User } from "@/lib/auth";
import { sampleRecipes } from "@/lib/sample-data";

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const recipe = sampleRecipes.find((r) => r.id === params.id);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUser());
  }, []);

  if (!recipe) {
    notFound();
  }

  if (!mounted) {
    return <div className="mx-auto max-w-3xl px-4 py-16">로딩 중...</div>;
  }

  // 접근 제어
  if (!isSubscribed(user)) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="text-5xl">🔒</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          구독자 전용 콘텐츠
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          레시피 상세를 보려면 먼저 가입이 필요합니다.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/signup?plan=free" className="btn-primary">
            7일 무료 체험
          </Link>
          <Link href="/pricing" className="btn-secondary">
            요금제 보기
          </Link>
        </div>
      </div>
    );
  }

  if (recipe.premium && !isPaidSubscriber(user)) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="text-5xl">⭐</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          프리미엄 레시피입니다
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          이 레시피는 월간/연간 구독자만 열람할 수 있어요.
        </p>
        <div className="mt-6">
          <Link href="/pricing" className="btn-primary">
            업그레이드하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← 목록으로
      </button>

      <div className="mt-6 aspect-[16/9] rounded-2xl bg-gradient-to-br from-brand-100 to-orange-200 flex items-center justify-center text-8xl">
        {recipe.emoji}
      </div>

      <h1 className="mt-8 text-3xl font-bold text-gray-900 md:text-4xl">
        {recipe.title}
      </h1>
      <p className="mt-3 text-lg text-gray-600">{recipe.summary}</p>
      <div className="mt-4 flex gap-4 text-sm text-gray-500">
        <span>⏱ {recipe.cookTime}</span>
        <span>🔥 {recipe.difficulty}</span>
        {recipe.premium && (
          <span className="rounded-full bg-brand-500 px-3 py-0.5 text-xs font-bold text-white">
            PREMIUM
          </span>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">재료</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
          {recipe.ingredients.map((item, i) => (
            <li key={i} className="rounded-lg bg-gray-50 px-3 py-2">
              • {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">조리 순서</h2>
        <ol className="mt-4 space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="pt-1 text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 rounded-2xl bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600">
          다음 레시피는 내일 아침 7시에 카톡으로 도착합니다 (실제 발송 없음 ·
          데모)
        </p>
      </div>
    </div>
  );
}
