"use client";
import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

 
const InputField = forwardRef(({ label, placeholder, type = "text", error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5 w-full mb-4 text-right group">
      {/* التسمية - Label */}
      {label && (
        <label className="text-slate-700 text-sm font-semibold mr-1 transition-colors group-focus-within:text-purple-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          ref={ref}  
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          dir="rtl"
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200
            bg-slate-50 text-slate-900 placeholder:text-slate-400
            /* حالة التركيز - Focus */
            focus:bg-white focus:ring-4 
            /* حالة الخطأ - Error */
            ${error 
              ? "border-red-400 focus:ring-red-50 focus:border-red-500" 
              : "border-slate-200 focus:ring-purple-50 focus:border-purple-600 hover:border-slate-300"
            }
          `}
        />

         {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 p-1 rounded-md transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

       {error && (
        <span className="text-red-500 text-xs mt-1 mr-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;