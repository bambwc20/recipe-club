"use client";

// 강의 데모용 초간단 인증 (localStorage 기반)
// 실제 서비스에서는 NextAuth, Supabase Auth 등 사용하세요.

export type User = {
  email: string;
  name: string;
  plan: "none" | "free" | "monthly" | "yearly";
  billingKey?: string;
  customerKey?: string;
  subscribedAt?: string;
  lastPaymentKey?: string;
};

const USER_KEY = "recipe_club_user";
const PAYMENTS_KEY = "recipe_club_payments";

export type PaymentRecord = {
  paymentKey: string;
  orderId: string;
  orderName: string;
  amount: number;
  approvedAt: string;
  method: string;
};

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setUser(user: User) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateUser(patch: Partial<User>) {
  const current = getUser();
  if (!current) return;
  setUser({ ...current, ...patch });
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PAYMENTS_KEY);
}

export function getPayments(): PaymentRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(PAYMENTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PaymentRecord[];
  } catch {
    return [];
  }
}

export function addPayment(record: PaymentRecord) {
  const list = getPayments();
  list.unshift(record);
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(list));
}

export function isSubscribed(user: User | null): boolean {
  if (!user) return false;
  return user.plan === "monthly" || user.plan === "yearly" || user.plan === "free";
}

export function isPaidSubscriber(user: User | null): boolean {
  if (!user) return false;
  return user.plan === "monthly" || user.plan === "yearly";
}

export function generateCustomerKey(email: string): string {
  // 토스페이먼츠 customerKey는 영문·숫자·하이픈·언더스코어만 허용 (최소 2자)
  const safe = email.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `cust_${safe}_${Date.now()}`;
}
