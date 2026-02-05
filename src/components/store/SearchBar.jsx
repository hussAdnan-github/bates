"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // فتح وإغلاق البحث واستهداف الحقل تلقائياً
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // إغلاق عند الضغط على زر Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative flex items-center justify-end" dir="rtl">
      {/* مساحة ثابتة للحقل حتى لا يتحرك Navbar */}
      <div className="w-[250px] md:w-[400px] h-10 relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ما الذي تبحث عنه؟"
          className={`absolute right-0 top-0 w-full h-10 pr-10 pl-10 rounded-full border-[#2D1B50]/20 bg-gray-50 shadow-sm transition-all duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        />

        {/* أيقونة البحث */}

        {/* زر الإغلاق */}
        {isOpen && (
          <>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </>
        )}
      </div>

      {/* زر أيقونة البحث الرئيسي */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearch}
          className="text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <Search className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
