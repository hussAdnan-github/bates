import React from "react";

function StatusBadge({ text, type }) {
  const styles = {
    active: "bg-green-100 text-green-600", // للحالة "نشط"
    role: "bg-blue-100 text-blue-600", // لـ "مستخدم" أو "مشرف"
    default: "bg-gray-100 text-gray-600",
  };

  const selectedStyle = styles[type] || styles.default;
  return (
    <span
      className={`px-4 py-1 rounded-full text-xs font-bold ${selectedStyle}`}
    >
      {text}
    </span>
  );
}

export default StatusBadge;
