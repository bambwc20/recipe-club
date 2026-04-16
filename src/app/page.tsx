import Link from "next/link";
import { sampleRecipes } from "@/lib/sample-data";

export default function HomePage() {
  const featured = sampleRecipes.slice(0, 3);

  return (
    <>
      {/* 히어로 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-orange-50">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
              🔥 셰프가 직접 엄선한 매일의 메뉴
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
              매일 저녁 메뉴 고민,
              <br />
              <span className="text-brand-500">이제 끝.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:text-xl">
              셰프가 엄선한 오늘의 레시피를 매일 아침 7시에 받아보세요.
              <br />
              재료 쇼핑 리스트까지 함께 보내드립니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/pricing" className="btn-primary text-lg !px-8 !py-4">
                7일 무료체험 시작하기
              </Link>
              <Link href="#features" className="btn-secondary text-lg !px-8 !py-4">
                어떤 레시피인지 보기
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              ✓ 첫 7일 무료  ·  ✓ 언제든 취소 가능  ·  ✓ 신용카드 필요 없음
            </p>
          </div>
        </div>
      </section>

      {/* 무료 샘플 */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            이번 주 무료 레시피 미리보기
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            구독 전에 맛보기 3개를 먼저 드려요.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((recipe) => (
            <div key={recipe.id} className="card hover:shadow-md transition">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-100 to-orange-200 flex items-center justify-center text-6xl">
                {recipe.emoji}
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                {recipe.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{recipe.summary}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>⏱ {recipe.cookTime}</span>
                <span>🔥 {recipe.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 혜택 섹션 */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              구독하면 이런 게 달라져요
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-3xl">
                ⏰
              </div>
              <h3 className="mt-6 text-xl font-bold">매일 아침 7시</h3>
              <p className="mt-2 text-gray-600">
                출근 전에 오늘 저녁 메뉴가 카톡으로 도착해요.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-3xl">
                🛒
              </div>
              <h3 className="mt-6 text-xl font-bold">쇼핑 리스트 자동</h3>
              <p className="mt-2 text-gray-600">
                필요한 재료 리스트가 이미 정리되어 있어요.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-3xl">
                👨‍🍳
              </div>
              <h3 className="mt-6 text-xl font-bold">셰프 큐레이션</h3>
              <p className="mt-2 text-gray-600">
                호텔 셰프 출신이 직접 엄선한 메뉴만.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          오늘부터 저녁 고민에서 해방되세요
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          7일 무료, 마음에 안 들면 언제든 취소
        </p>
        <div className="mt-8">
          <Link href="/pricing" className="btn-primary text-lg !px-10 !py-4">
            지금 시작하기 →
          </Link>
        </div>
      </section>
    </>
  );
}
