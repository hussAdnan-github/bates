"use client";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const generatePagination = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, "...", total - 1, total];
    }
    if (current >= total - 2) {
      return [1, 2, "...", total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const pages = generatePagination(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 flex-wrap" dir="ltr">
      {/* الانتقال لآخر صفحة */}
      <button
        className="cursor-pointer w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasNextPage}
        onClick={() => router.push(createPageURL(totalPages))}
        aria-label="الصفحة الأخيرة"
      >
        <ChevronsLeft size={18} />
      </button>

      {/* الصفحة التالية */}
      <button
        className="cursor-pointer w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasNextPage}
        onClick={() => router.push(createPageURL(currentPage + 1))}
        aria-label="الصفحة التالية"
      >
        <ChevronLeft size={18} />
      </button>

      {/* أرقام الصفحات */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {pages.reverse().map((pageNumber, idx) => (
          pageNumber === "..." ? (
            <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">
              ...
            </span>
          ) : (
            <Link
              key={pageNumber}
              href={createPageURL(pageNumber)}
              className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-xl transition-all border shadow-sm ${
                currentPage === pageNumber
                  ? "bg-[#2D1B54] text-white border-[#2D1B54] shadow-indigo-200"
                  : "bg-white text-[#2D1B54] border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {pageNumber}
            </Link>
          )
        ))}
      </div>

      {/* الصفحة السابقة */}
      <button
        className="cursor-pointer w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasPrevPage}
        onClick={() => router.push(createPageURL(currentPage - 1))}
        aria-label="الصفحة السابقة"
      >
        <ChevronRight size={18} />
      </button>

      {/* الانتقال لأول صفحة */}
      <button
        className="cursor-pointer w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasPrevPage}
        onClick={() => router.push(createPageURL(1))}
        aria-label="الصفحة الأولى"
      >
        <ChevronsRight size={18} />
      </button>
    </nav>
  );
}