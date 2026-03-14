// import React from 'react';
// import UserItem from './UserItem';
 

// const RecentUsersList = () => {
//   const users = [
//     { id: 1, name: 'ITECH-Hamdi-Albasha', date: 'Jan, 2026 29' },
//     { id: 2, name: 'Al-kumadi', date: 'Jan, 2026 21' },
//     { id: 3, name: 'Magicalstore', date: 'Jan, 2026 21' },
//     { id: 4, name: 'Altaiseratphon-Tareem', date: 'Jan, 2026 20' },
//     { id: 5, name: 'UNITED', date: 'Jan, 2026 17' },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
//       <div className="flex justify-between items-start mb-6">
//         <button className="text-purple-900 font-bold text-sm hover:underline">عرض الكل</button>
//         <h2 className="text-lg font-bold text-gray-800">أحدث المستخدمين المسجلين</h2>
//       </div>
      
//       <div className="flex flex-col">
//         {users.map(user => (
//           <UserItem key={user.id} name={user.name} date={user.date} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentUsersList;


import React from 'react';
import UserItem from './UserItem';
import { UserPlus, ArrowLeft } from 'lucide-react'; // أيقونات إضافية للجمالية

const RecentUsersList = () => {
  const users = [
    { id: 1, name: 'ITECH-Hamdi-Albasha', date: 'منذ 5 دقائق', initial: 'H', color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Al-kumadi', date: 'منذ ساعتين', initial: 'A', color: 'bg-purple-100 text-purple-600' },
    { id: 3, name: 'Magicalstore', date: '21 يناير 2026', initial: 'M', color: 'bg-amber-100 text-amber-600' },
    { id: 4, name: 'Altaiseratphon-Tareem', date: '20 يناير 2026', initial: 'T', color: 'bg-emerald-100 text-emerald-600' },
    { id: 5, name: 'UNITED', date: '17 يناير 2026', initial: 'U', color: 'bg-rose-100 text-rose-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg text-[#2D1B50]">
            <UserPlus size={20} />
          </div>
          <h2 className="text-xl font-black text-[#2D1B50]">المستخدمين الجدد</h2>
        </div>
        
        <button className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-[#FFC107] transition-colors group">
          عرض الكل
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* القائمة */}
      <div className="flex flex-col gap-1">
        {users.map((user, index) => (
          <UserItem 
            key={user.id} 
            name={user.name} 
            date={user.date} 
            initial={user.initial}
            color={user.color}
            isLast={index === users.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentUsersList;