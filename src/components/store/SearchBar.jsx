"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    // 1. إنشاء وحدة تحكم للإلغاء
    const controller = new AbortController();
    const signal = controller.signal;

    const delayDebounce = setTimeout(
      async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://bts.pythonanywhere.com/api/products/products/?search=${query}`,
          { signal }, // 2. تمرير الإشارة للـ fetch
        );

        const data = await res.json();

        if (data.success) {
          setResults(data.data.results || []);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          // تم إلغاء الطلب بنجاح، لا تفعل شيئاً
        } else {
          console.error("خطأ في البحث:", err);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort(); // 3. إلغاء الطلب السابق إذا تغيرت الـ query قبل انتهاء الطلب
    };
  }, [query]);
  // إغلاق عند الضظغط على زر Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative flex items-center justify-end" dir="rtl">
      <div className="w-[250px] md:w-[400px] relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ما الذي تبحث عنه؟"
          className={`h-10 pr-10 pl-10 rounded-full bg-gray-50 transition-all duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        />

        {/* {isOpen && (
          <>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery("");
                setResults([]);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </>
        )} */}

        {/* نتائج البحث */}
        {isOpen && query && (
          <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border max-h-96 overflow-y-auto">
            {loading && (
              <p className="p-4 text-center text-sm text-gray-400">
                جاري البحث...
              </p>
            )}

            {!loading && results.length === 0 && (
              <p className="p-4 text-center text-sm text-gray-400">
                لا توجد نتائج
              </p>
            )}

            {results.map((item) => (
              <Link
                key={item.id}
                href={`/shop/products/${item.id}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 transition"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700 line-clamp-1">
                    {item.name}
                  </p>
                  <span className="text-xs text-[#F18721] font-semibold">
                    {item.price} ر.س
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearch}
          className="text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <Search className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
