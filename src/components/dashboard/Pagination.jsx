// "use client";

// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function Pagination({
//   nameApi,
//   currentPage,
//   totalPages,
//   hasPrevPage,
//   hasNextPage,
// }) {
//   const router = useRouter();

//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
//   console.log(`${nameApi}page=${currentPage - 1}`);
//   return (
//     <nav className="flex justify-center items-center gap-4 mt-8">
//       {hasPrevPage == null ? (
//         ``
//       ) : (
//         <button
//           className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
//           disabled={!hasPrevPage}
//           onClick={() => router.push(`${nameApi}?page=${0}`)}
//           aria-label="الصفحة التالية"
//         >
//           <ChevronsRight />
//         </button>
//       )}
//       <button
//         className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
//         disabled={!hasPrevPage}
//         onClick={() => router.push(`${nameApi}?page=${currentPage - 1}`)}
//         aria-label="الصفحة السابقة"
//       >
//         <ChevronsRight />
//       </button>

//       <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border border-gray-200">
//         {pageNumbers.map((pageNumber) => (
//           <Link
//             key={pageNumber}
//             href={`${nameApi}?page=${pageNumber}`}
//             className={`w-9 h-9 flex items-center justify-center text-sm font-bold rounded-full transition-all duration-200 border-2 ${
//               currentPage === pageNumber
//                 ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-110"
//                 : "text-blue-600 bg-white border-blue-200 hover:bg-blue-50 hover:scale-105"
//             }`}
//             aria-current={currentPage === pageNumber ? "page" : undefined}
//           >
//             {pageNumber}
//           </Link>
//         ))}
//       </div>

//       <button
//         className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
//         disabled={!hasNextPage}
//         onClick={() => router.push(`${nameApi}?page=${currentPage + 1}`)}
//         aria-label="الصفحة التالية"
//       >
//         <ChevronsLeft />
//       </button>
//       {hasNextPage == null ? (
//         ``
//       ) : (
//         <button
//           className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
//           disabled={!hasNextPage}
//           onClick={() => router.push(`${nameApi}?page=${totalPages}`)}
//           aria-label="الصفحة التالية"
//         >
//           <ChevronsLeft />
//         </button>
//       )}
//     </nav>
//   );
// }

"use client";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Pagination({
  nameApi,
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
}) {
  const router = useRouter();
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

   const baseUrl = nameApi.endsWith("/") ? nameApi.slice(0, -1) : nameApi;

  return (
    <nav className="flex justify-center items-center gap-2" dir="ltr">
      <button
        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasNextPage}
        onClick={() => router.push(`${baseUrl}?page=${totalPages}`)}
        aria-label="الصفحة الأخيرة"
      >
        <ChevronsLeft size={18} />
      </button>

      <button
        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasNextPage}
        onClick={() => router.push(`${baseUrl}?page=${currentPage + 1}`)}
        aria-label="الصفحة التالية"
      >
        <ChevronLeft size={18} />
      </button>
      {/* أرقام الصفحات */}
      <div className="flex items-center gap-2">
        {pageNumbers.reverse().map((pageNumber) => (
          <Link
            key={pageNumber}
            href={`${baseUrl}?page=${pageNumber}`}
            className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-xl transition-all border shadow-sm ${
              currentPage === pageNumber
                ? "bg-[#2D1B54] text-white border-[#2D1B54] shadow-indigo-200"
                : "bg-white text-[#2D1B54] border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
            }`}
          >
            {pageNumber}
          </Link>
        ))}
      </div>
      <button
        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasPrevPage}
        onClick={() => router.push(`${baseUrl}?page=${currentPage - 1}`)}
        aria-label="الصفحة السابقة"
      >
        <ChevronRight size={18} />
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!hasPrevPage}
        onClick={() => router.push(`${baseUrl}?page=1`)}
        aria-label="الصفحة الأولى"
      >
        <ChevronsRight size={18} />
      </button>
    </nav>
  );
}
