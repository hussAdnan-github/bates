"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSearchProduts } from "@/actions/product";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await getSearchProduts(query);
        if (data.success) {
          setResults(data.data.results || []);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("خطأ في البحث:", err);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);

  // إغلاق النتائج عند النقر خارج المربع
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={wrapperRef} className="relative w-full lg:w-[390px]" dir="rtl">
      {/* حقل البحث */}
      <div 
        className={`relative flex items-center w-full h-10 lg:h-12 rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 border-2 
          ${isFocused 
            ? "border-[var(--primary_color)] bg-white shadow-[0_4px_20px_rgba(255,193,7,0.15)]" 
            : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"}`}
      >
        <div className="flex items-center justify-center pl-2 pr-3 lg:pr-4 text-gray-400">
          <Search className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors duration-300 ${isFocused ? "text-[var(--primary_color)]" : ""}`} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="ما الذي تبحث عنه؟..."
          className="flex-1 bg-transparent border-none outline-none h-full text-xs lg:text-sm text-[var(--secondary_color)] placeholder:text-gray-400 px-1  "
        />

        <div className="flex items-center justify-center px-2 lg:px-3 min-w-[36px] lg:min-w-[40px]">
          {loading ? (
            <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--primary_color)] animate-spin" />
          ) : query ? (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
            >
              <X className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
            </button>
          ) : null}
        </div>
      </div>

      {/* قائمة النتائج */}
      {isFocused && query.length >= 2 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 max-h-[400px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
          
          {loading && results.length === 0 && (
            <div className="p-8 text-center text-sm font-bold text-gray-400 flex flex-col items-center gap-3">
              <Loader2 className="w-7 h-7 text-[var(--primary_color)] animate-spin" />
              جاري البحث...
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-8 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-1">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-bold text-[var(--secondary_color)]">لا توجد نتائج مطابقة لبحثك</p>
              <p className="text-xs text-gray-400">حاول استخدام كلمات مفتاحية مختلفة</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2 space-y-1">
              <div className="px-3 py-2 border-b border-gray-50 mb-2">
                <span className="text-xs font-bold text-gray-400">النتائج المطابقة</span>
              </div>
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/shop/products/${item.id}`}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                  onClick={() => setIsFocused(false)}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm group-hover:border-[var(--primary_color)]/40 transition-colors">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] md:text-sm font-black text-[var(--secondary_color)] line-clamp-1 group-hover:text-[var(--primary_color)] transition-colors">
                      {item.name}
                    </p>
                    <div className="mt-1">
                      <span className="text-[10px] md:text-xs font-bold text-[var(--secondary_color)] bg-[#FFC107]/10 px-2.5 py-1 rounded-md inline-block">
                        {item.price} ر.س
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
