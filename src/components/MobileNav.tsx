"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#features", label: "특징" },
  { href: "/pricing", label: "요금제" },
  { href: "/members", label: "구독자 전용" },
  { href: "/mypage", label: "마이페이지" },
  { href: "/login", label: "로그인" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label="메뉴 열기"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-full border-b border-gray-200 bg-white px-4 py-3 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
