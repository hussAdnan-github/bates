import React from 'react'

function StatsCard({ title, value, icon: Icon, iconBgColor }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="text-right">
        <h3 className="text-4xl font-bold text-gray-800">{value}</h3>
        <p className="text-gray-500 text-sm mt-1">{title}</p>
      </div>
      <div className={`p-4 rounded-full ${iconBgColor} text-white`}>
        <Icon size={28} />
      </div>
    </div>
  );
}

export default StatsCard