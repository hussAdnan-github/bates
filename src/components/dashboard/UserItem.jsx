// const UserItem = ({ name, date }) => (
//   <div className="flex flex-col items-end py-3 border-b border-gray-50 last:border-0">
//     <span className="font-bold text-gray-800 text-sm">{name}</span>
//     <span className="text-xs text-gray-400">{date}</span>
//   </div>
// );

// export default UserItem;


import React from 'react';

const UserItem = ({ name, date, initial, color, isLast }) => {
  return (
    <div className={`group flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all duration-200 cursor-pointer ${!isLast ? 'mb-1' : ''}`}>
      <div className="flex items-center gap-4">
        {/* الصورة الرمزية (Avatar) */}
        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${color}`}>
          {initial}
        </div>
        
        {/* المعلومات */}
        <div className="flex flex-col">
          <span className="font-bold text-[#2D1B50] text-[15px] group-hover:text-blue-600 transition-colors line-clamp-1 max-w-[150px] md:max-w-none">
            {name}
          </span>
          <span className="text-[11px] text-gray-400 font-medium tracking-tight">
            {date}
          </span>
        </div>
      </div>

      {/* نقطة الحالة (Status Dot) */}
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
    </div>
  );
};

export default UserItem;