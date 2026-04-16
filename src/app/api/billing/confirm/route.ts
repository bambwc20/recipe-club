import { NextRequest, NextResponse } from "next/server";

// 토스페이먼츠 빌링키 발급 + 첫 자동결제 승인
// 1) authKey → billingKey 교환
// 2) billingKey 로 실제 첫 결제 실행

const TOSS_API = "https://api.tosspayments.com/v1";

function getAuthHeader(): string {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    throw new Error("TOSS_SECRET_KEY 환경 변수가 설정되지 않았습니다.");
  }
  // 토스페이먼츠 Basic 인증: "시크릿키:" 를 base64
  const encoded = Buffer.from(`${secretKey}:`).toString("base64");
  return `Basic ${encoded}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerKey,
      authKey,
      amount,
      orderName,
      customerEmail,
      customerName,
    } = body as {
      customerKey: string;
      authKey: string;
      amount: number;
      orderName: string;
      customerEmail: string;
      customerName: string;
    };

    if (!customerKey || !authKey || !amount || !orderName) {
      return NextResponse.json(
        { message: "필수 파라미터 누락" },
        { status: 400 }
      );
    }

    // Step 1: authKey → billingKey 교환
    const issueRes = await fetch(`${TOSS_API}/billing/authorizations/issue`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authKey, customerKey }),
    });

    const issueData = await issueRes.json();
    if (!issueRes.ok) {
      return NextResponse.json(
        {
          message: issueData.message || "빌링키 발급 실패",
          code: issueData.code,
        },
        { status: issueRes.status }
      );
    }

    const billingKey = issueData.billingKey as string;

    // Step 2: billingKey 로 첫 결제 실행
    const orderId = `order_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;

    const payRes = await fetch(`${TOSS_API}/billing/${billingKey}`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerKey,
        amount,
        orderId,
        orderName,
        customerEmail,
        customerName,
      }),
    });

    const payData = await payRes.json();
    if (!payRes.ok) {
      return NextResponse.json(
        {
          message: payData.message || "자동결제 승인 실패",
          code: payData.code,
          billingKey,
        },
        { status: payRes.status }
      );
    }

    return NextResponse.json({
      billingKey,
      payment: payData,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "서버 오류";
    return NextResponse.json({ message }, { status: 500 });
  }
}
