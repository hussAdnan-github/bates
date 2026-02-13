const UserItem = ({ name, date }) => (
  <div className="flex flex-col items-end py-3 border-b border-gray-50 last:border-0">
    <span className="font-bold text-gray-800 text-sm">{name}</span>
    <span className="text-xs text-gray-400">{date}</span>
  </div>
);

export default UserItem;