"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FailInner() {
  const search = useSearchParams();
  const code = search.get("code");
  const message = search.get("message");

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="text-5xl">😢</div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">결제 실패</h1>
      {message && (
        <p className="mt-2 text-sm text-red-600">{decodeURIComponent(message)}</p>
      )}
      {code && (
        <p className="mt-1 text-xs text-gray-400">코드: {code}</p>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/pricing" className="btn-primary">
          다시 시도
        </Link>
        <Link href="/" className="btn-secondary">
          홈으로
        </Link>
      </div>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-20 text-center">로딩 중...</div>}>
      <FailInner />
    </Suspense>
  );
}
