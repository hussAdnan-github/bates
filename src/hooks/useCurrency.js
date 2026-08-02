"use client";
import { useState, useEffect } from "react";

export function useCurrency() {
  const [currencySymbol, setCurrencySymbol] = useState("ر.س");

  useEffect(() => {
    const updateCurrency = () => {
      const match = document.cookie.match(/(^| )type_money=([^;]+)/);
      const type_money = match ? match[2] : "3";

      if (type_money === "3") {
        setCurrencySymbol("ر.س");
      } else if (type_money === "1") {
        setCurrencySymbol("ر.ي قديم");
      } else {
        setCurrencySymbol("ر.ي جديد");
      }
    };

    // تعيين القيمة المبدئية
    updateCurrency();

    // الاستماع لأي تغيير في العملة بدون إعادة تحميل الصفحة
    window.addEventListener("currencyChanged", updateCurrency);
    
    return () => window.removeEventListener("currencyChanged", updateCurrency);
  }, []);

  return currencySymbol;
}
