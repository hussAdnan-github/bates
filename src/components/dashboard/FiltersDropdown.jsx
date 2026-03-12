'use client';
import React from "react";
import { ChevronDown } from "lucide-react";

function  FiltersDropdown({ options = [], placeholder, onChange}) {
  return (
    <div className={`relative ${className}`}>
      <select
        onChange={(e) => onChange && onChange(e.target.value)}
        className="appearance-none bg-[#F8F9FB] border border-gray-200 text-gray-600 text-sm rounded-lg block w-full p-2.5 pr-8 pl-10 outline-none cursor-pointer focus:ring-2 focus:ring-purple-500/10 transition-all text-right"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
       <ChevronDown
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={16}
      />
    </div>
  );
}

export default FiltersDropdown;
