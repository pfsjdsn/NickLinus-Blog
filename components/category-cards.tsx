"use client";

import { Cat, Dog, PawPrint, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "前端技术",
    desc: "Vue3、React、TypeScript 等前端框架与工具的实战经验分享，像猫咪一样优雅地写代码",
    icon: Cat,
    color: "from-orange-100 to-amber-50 border-orange-200 dark:from-orange-950/40 dark:to-amber-950/30 dark:border-orange-800",
    iconBg: "bg-orange-200 text-orange-700 dark:bg-orange-800 dark:text-orange-300",
    textColor: "text-orange-700 dark:text-orange-300",
    descColor: "text-orange-600/80 dark:text-orange-400/80",
    linkColor: "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300",
    href: "/tags/Vue",
  },
  {
    title: "后端技术",
    desc: "Node.js、数据库、API 设计等后端开发技术文章，像狗狗一样忠诚可靠地构建服务",
    icon: Dog,
    color: "from-sky-100 to-blue-50 border-sky-200 dark:from-sky-950/40 dark:to-blue-950/30 dark:border-sky-800",
    iconBg: "bg-sky-200 text-sky-700 dark:bg-sky-800 dark:text-sky-300",
    textColor: "text-sky-700 dark:text-sky-300",
    descColor: "text-sky-600/80 dark:text-sky-400/80",
    linkColor: "text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300",
    href: "/tags/Node.js",
  },
  {
    title: "学习笔记",
    desc: "持续学习，记录成长过程中的点滴收获，每一个脚印都是进步的痕迹",
    icon: PawPrint,
    color: "from-pink-100 to-rose-50 border-pink-200 dark:from-pink-950/40 dark:to-rose-950/30 dark:border-pink-800",
    iconBg: "bg-pink-200 text-pink-700 dark:bg-pink-800 dark:text-pink-300",
    textColor: "text-pink-700 dark:text-pink-300",
    descColor: "text-pink-600/80 dark:text-pink-400/80",
    linkColor: "text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300",
    href: "/tags/学习笔记",
  },
];

export function CategoryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Link
            key={cat.title}
            href={cat.href}
            className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br ${cat.color} p-5 transition-all hover:-translate-y-0.5 hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${cat.iconBg}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${cat.textColor}`}>{cat.title}</h3>
                <p className={`mt-1 text-sm leading-relaxed ${cat.descColor}`}>{cat.desc}</p>
                <div className={`mt-3 inline-flex items-center gap-1 text-sm font-medium ${cat.linkColor}`}>
                  去看看
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
