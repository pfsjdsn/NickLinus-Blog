import { NextResponse } from "next/server";

// Module-level cache — persists across warm invocations on Vercel
let totalViews = 0;
let todayDate = "";
let todayViews = 0;

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function resetTodayIfNeeded() {
  const today = getToday();
  if (todayDate !== today) {
    todayDate = today;
    todayViews = 0;
  }
}

export async function GET() {
  resetTodayIfNeeded();
  return NextResponse.json({ totalViews, todayViews });
}

export async function POST() {
  resetTodayIfNeeded();
  totalViews++;
  todayViews++;
  return NextResponse.json({ totalViews, todayViews });
}
