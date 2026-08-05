"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  baseUrl?: string;
}

function getPageUrl(page: number, baseUrl: string): string {
  if (page === 1) {
    if (baseUrl === "/page") return "/";
    return baseUrl.replace("/page", "");
  }
  return `${baseUrl}/${page}`;
}

export function PaginationNav({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  baseUrl = "/page",
}: PaginationNavProps) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    router.push(url);
  };

  const prevUrl = hasPrevPage
    ? getPageUrl(currentPage - 1, baseUrl)
    : "";
  const nextUrl = hasNextPage
    ? getPageUrl(currentPage + 1, baseUrl)
    : "";

  // 计算要显示的页码
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // 始终显示第一页
    pages.push(1);

    // 当前页附近的窗口
    const windowStart = Math.max(2, currentPage - 2);
    const windowEnd = Math.min(totalPages - 1, currentPage + 2);

    if (windowStart > 2) pages.push("ellipsis");

    for (let i = windowStart; i <= windowEnd; i++) {
      pages.push(i);
    }

    if (windowEnd < totalPages - 1) pages.push("ellipsis");

    // 始终显示最后一页
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {/* 上一页 */}
        <PaginationItem>
          {hasPrevPage ? (
            <PaginationPrevious
              href={prevUrl}
              onClick={(e) => handleClick(e, prevUrl)}
            />
          ) : (
            <PaginationPrevious
              href="#"
              aria-disabled="true"
              className="pointer-events-none opacity-50"
              onClick={(e) => e.preventDefault()}
            />
          )}
        </PaginationItem>

        {/* 页码 */}
        {pageNumbers.map((page, idx) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageUrl = getPageUrl(page, baseUrl);
          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={pageUrl}
                isActive={isActive}
                onClick={(e) => handleClick(e, pageUrl)}
                size={isActive ? "default" : "icon"}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 下一页 */}
        <PaginationItem>
          {hasNextPage ? (
            <PaginationNext
              href={nextUrl}
              onClick={(e) => handleClick(e, nextUrl)}
            />
          ) : (
            <PaginationNext
              href="#"
              aria-disabled="true"
              className="pointer-events-none opacity-50"
              onClick={(e) => e.preventDefault()}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
