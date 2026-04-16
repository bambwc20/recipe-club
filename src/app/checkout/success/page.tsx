"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { addPayment, getUser, updateUser } from "@/lib/auth";

type Status = "loading" | "success" | "error";

function SuccessInner() {
  const router = useRouter();
  const search = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("결제 승인 중...");
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const customerKey = search.get("customerKey");
    const authKey = search.get("authKey");
    const planId = (search.get("plan") || "monthly") as "monthly" | "yearly";

    if (!customerKey || !authKey) {
      setStatus("error");
      setMessage("필수 파라미터가 누락되었습니다.");
      return;
    }

    const user = getUser();
    if (!user) {
      setStatus("error");
      setMessage("회원 정보를 찾을 수 없습니다.");
      return;
    }

    const amount = planId === "yearly" ? 99000 : 9900;
    const orderName =
      planId === "yearly"
        ? "오늘의 레시피 클럽 연간 구독"
        : "오늘의 레시피 클럽 월간 구독";

    fetch("/api/billing/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerKey,
        authKey,
        amount,
        orderName,
        customerEmail: user.email,
        customerName: user.name,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "결제 승인 실패");
        }
        updateUser({
          plan: planId,
          billingKey: data.billingKey,
          subscribedAt: new Date().toISOString(),
          lastPaymentKey: data.payment?.paymentKey,
        });
        if (data.payment) {
          addPayment({
            paymentKey: data.payment.paymentKey,
            orderId: data.payment.orderId,
            orderName: data.payment.orderName,
            amount: data.payment.totalAmount || amount,
            approvedAt: data.payment.approvedAt || new Date().toISOString(),
            method: data.payment.method || "카드",
          });
        }
        setStatus("success");
        setMessage("구독이 완료되었습니다!");
        setTimeout(() => router.push("/mypage"), 2000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "결제 승인에 실패했습니다.");
      });
  }, [router, search]);

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      {status === "loading" && (
        <>
          <div className="text-5xl">⏳</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{message}</h1>
          <p className="mt-2 text-sm text-gray-500">잠시만 기다려주세요.</p>
        </>
      )}
      {status === "success" && (
        <>
          <div className="text-5xl">🎉</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{message}</h1>
          <p className="mt-2 text-sm text-gray-600">
            잠시 후 마이페이지로 이동합니다.
          </p>
          <Link href="/mypage" className="btn-primary mt-6 inline-flex">
            마이페이지 바로가기
          </Link>
        </>
      )}
      {status === "error" && (
        <>
          <div className="text-5xl">❌</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">결제 실패</h1>
          <p className="mt-2 text-sm text-red-600">{message}</p>
          <Link href="/pricing" className="btn-primary mt-6 inline-flex">
            다시 시도하기
          </Link>
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-20 text-center">로딩 중...</div>}>
      <SuccessInner />
    </Suspense>
  );
}
