'use client';
import React from 'react'
import { Search } from 'lucide-react';

function SearchInput({ placeholder = "ابحث هنا...", onSearch, className = "" }) {
return (
    <div className={`relative w-full max-w-xs ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="w-full bg-[#F8F9FB] border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm text-right focus:outline-none focus:ring-2 focus:ring-purple-500/10 transition-all placeholder:text-gray-400"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    </div>
  );
}

export default SearchInput