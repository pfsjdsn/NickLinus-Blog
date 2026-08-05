"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, CloudRain, Quote, Thermometer } from "lucide-react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatDateCN(date: Date) {
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const weekday = weekdays[date.getDay()];
  return { dateStr: `${year}年${month}月${day}日`, weekday };
}

// 每日一言池
const quotes = [
  { text: "出入相友，守望相助。", from: "《孟子》" },
  { text: "代码如诗，简洁为美。", from: "NickLinus" },
  { text: "Stay hungry, stay foolish.", from: "Steve Jobs" },
  { text: "行百里者半九十。", from: "《战国策》" },
  { text: "Talk is cheap. Show me the code.", from: "Linus Torvalds" },
  { text: "不积跬步，无以至千里。", from: "荀子" },
  { text: "The only way to do great work is to love what you do.", from: "Steve Jobs" },
  { text: "工欲善其事，必先利其器。", from: "《论语》" },
  { text: "Good code is its own best documentation.", from: "Steve McConnell" },
  { text: "学而时习之，不亦说乎？", from: "《论语》" },
];

function getDailyQuote() {
  // 用日期作为种子，同一天显示同一句话
  const dayIndex = new Date().getDate() % quotes.length;
  return quotes[dayIndex];
}

export function DashboardWidgets() {
  const [time, setTime] = useState<string>("");
  const [dateInfo, setDateInfo] = useState({ dateStr: "", weekday: "" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
      setDateInfo(formatDateCN(now));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const quote = getDailyQuote();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* 日期时间 */}
      <div className="relative overflow-hidden rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-green-800 dark:from-green-950/40 dark:to-emerald-950/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-300">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800 dark:text-green-200">{dateInfo.dateStr}</p>
            <p className="text-xs text-green-600 dark:text-green-400">{dateInfo.weekday}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-lg font-mono font-bold text-green-700 dark:text-green-300">
          <Clock className="h-4 w-4" />
          {time}
        </div>
      </div>

      {/* 天气 */}
      <div className="relative overflow-hidden rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-4 dark:border-sky-800 dark:from-sky-950/40 dark:to-blue-950/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-200 text-sky-700 dark:bg-sky-800 dark:text-sky-300">
            <CloudRain className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">28°C 多云</p>
            <p className="text-xs text-sky-600 dark:text-sky-400">深圳市 · 湿度 65%</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400">
          <Thermometer className="h-3.5 w-3.5" />
          体感 31°C · 空气优
        </div>
      </div>

      {/* 每日一言 */}
      <div className="relative overflow-hidden rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-4 dark:border-pink-800 dark:from-pink-950/40 dark:to-rose-950/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-200 text-pink-700 dark:bg-pink-800 dark:text-pink-300">
            <Quote className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium italic text-pink-800 dark:text-pink-200">
              "{quote.text}"
            </p>
            <p className="mt-1 text-right text-xs text-pink-500 dark:text-pink-400">—— {quote.from}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
