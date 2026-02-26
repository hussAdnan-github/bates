import React from "react";

function StatusBadge({ text, type = "default" }) {
  const styles = {
    active: "bg-yellow-100 text-yellow-700",   // جاري المعالجة
    success: "bg-green-100 text-green-600",   // تم الشحن / تم القبول
    danger: "bg-red-100 text-red-600",        // تم الإلغاء / تم الرفض
    warning: "bg-orange-100 text-orange-600", // تم التعديل
    role: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
  };

  const selectedStyle = styles[type] || styles.default;

  return (
    <span
      className={`px-4 py-1 rounded-full text-xs font-bold inline-block`}
      style={{ whiteSpace: "nowrap" }}
    >
      <span className={`${selectedStyle} px-8 py-2 rounded-full`}>{text}</span>
    </span>
  );
}

export default StatusBadge;