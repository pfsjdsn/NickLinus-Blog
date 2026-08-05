"use client";

import { Cat, Dog, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 px-6 py-12 dark:from-orange-950/30 dark:via-pink-950/20 dark:to-amber-950/30 sm:px-10 sm:py-16">
      {/* 背景装饰圆 */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-800/20" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-800/20" />

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {/* 左侧文字 */}
        <div className="flex-1 space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border bg-orange-100/60 px-3 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
            <Sparkles className="h-3.5 w-3.5" />
            欢迎来到我的技术角落
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-amber-700 dark:text-amber-300 sm:text-4xl">
            NickLinus{" "}
            <span className="text-orange-500">技术小窝</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300">
            前端开发者的代码花园{" "}
            <span className="inline-block">🐱</span>{" "}
            <span className="inline-block">🐶</span>
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-orange-400 to-amber-400 text-white hover:from-orange-500 hover:to-amber-500"
            >
              <Link href="/posts">开始探索</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-pink-300 text-pink-600 hover:bg-pink-50 hover:text-pink-700 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-950"
            >
              <Link href="/about">了解我</Link>
            </Button>
          </div>
        </div>

        {/* 右侧猫咪吉祥物 */}
        <div className="flex-shrink-0">
          <CatMascot />
        </div>
      </div>
    </section>
  );
}

function CatMascot() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* 猫脸底色 */}
      <circle cx="60" cy="65" r="40" fill="#FBBF24" />
      {/* 耳朵 */}
      <path d="M28 38 L40 15 L52 35 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
      <path d="M68 35 L80 15 L92 38 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
      {/* 内耳 */}
      <path d="M36 32 L40 22 L44 32 Z" fill="#FDE68A" />
      <path d="M76 32 L80 22 L84 32 Z" fill="#FDE68A" />
      {/* 眼睛 */}
      <ellipse cx="48" cy="58" rx="5" ry="7" fill="#1F2937" />
      <ellipse cx="72" cy="58" rx="5" ry="7" fill="#1F2937" />
      <circle cx="49" cy="56" r="2" fill="white" />
      <circle cx="73" cy="56" r="2" fill="white" />
      {/* 鼻子 */}
      <ellipse cx="60" cy="68" rx="3" ry="2" fill="#F472B6" />
      {/* 嘴 */}
      <path d="M56 72 Q60 76 64 72" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 胡须 */}
      <line x1="32" y1="65" x2="44" y2="66" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
      <line x1="30" y1="70" x2="42" y2="70" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
      <line x1="76" y1="66" x2="88" y2="65" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
      <line x1="78" y1="70" x2="90" y2="70" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
      {/* 腮红 */}
      <ellipse cx="38" cy="72" rx="6" ry="3" fill="#FBCFE8" opacity="0.6" />
      <ellipse cx="82" cy="72" rx="6" ry="3" fill="#FBCFE8" opacity="0.6" />
      {/* 身体 */}
      <ellipse cx="60" cy="108" rx="25" ry="12" fill="#FBBF24" />
      {/* 尾巴 */}
      <path d="M82 100 Q100 95 100 85 Q100 75 92 78" stroke="#FBBF24" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* 条纹 */}
      <line x1="48" y1="45" x2="52" y2="48" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <line x1="56" y1="42" x2="60" y2="46" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="42" x2="72" y2="46" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
