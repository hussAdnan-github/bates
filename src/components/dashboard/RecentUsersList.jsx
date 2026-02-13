import React from 'react';
import UserItem from './UserItem';
 

const RecentUsersList = () => {
  const users = [
    { id: 1, name: 'ITECH-Hamdi-Albasha', date: 'Jan, 2026 29' },
    { id: 2, name: 'Al-kumadi', date: 'Jan, 2026 21' },
    { id: 3, name: 'Magicalstore', date: 'Jan, 2026 21' },
    { id: 4, name: 'Altaiseratphon-Tareem', date: 'Jan, 2026 20' },
    { id: 5, name: 'UNITED', date: 'Jan, 2026 17' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <button className="text-purple-900 font-bold text-sm hover:underline">عرض الكل</button>
        <h2 className="text-lg font-bold text-gray-800">أحدث المستخدمين المسجلين</h2>
      </div>
      
      <div className="flex flex-col">
        {users.map(user => (
          <UserItem key={user.id} name={user.name} date={user.date} />
        ))}
      </div>
    </div>
  );
};

export default RecentUsersList;