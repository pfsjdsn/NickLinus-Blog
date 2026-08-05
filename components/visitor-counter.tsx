"use client";

import { useEffect, useState, useCallback } from "react";
import { Eye } from "lucide-react";

interface ViewCount {
  totalViews: number;
  todayViews: number;
}

export function VisitorCounter() {
  const [counts, setCounts] = useState<ViewCount | null>(null);

  const fetchAndIncrement = useCallback(async () => {
    try {
      // Increment view count
      await fetch("/api/views", { method: "POST" });
      // Get latest counts
      const res = await fetch("/api/views");
      if (res.ok) {
        const data = await res.json();
        setCounts(data);
      }
    } catch {
      // Silently fail — counter is not critical
    }
  }, []);

  useEffect(() => {
    // Avoid double counting in dev (React StrictMode double-renders)
    const key = `_visited_${window.location.pathname}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      fetchAndIncrement();
    } else {
      // Already counted this session, just fetch
      fetch("/api/views")
        .then((res) => res.json())
        .then((data) => setCounts(data))
        .catch(() => {});
    }
  }, [fetchAndIncrement]);

  if (!counts) return null;

  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Eye className="h-3.5 w-3.5" />
        <span>{counts.totalViews.toLocaleString()} 次浏览</span>
      </span>
      <span className="text-border">|</span>
      <span>今日 {counts.todayViews.toLocaleString()}</span>
    </div>
  );
}
