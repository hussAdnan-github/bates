// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
// import { useState } from "react";
// import LogoutButton from "../store/LogoutButton";

// export default function UserMenu() {
//   const [open, setOpen] = useState(false);
//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
//       <DropdownMenuTrigger asChild>
//         <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100 transition">
//           <span className="text-sm font-medium text-gray-800">admin</span>

//           <Avatar className="h-8 w-8">
//             <AvatarImage src="/avatar.png" alt="admin" />
//             <AvatarFallback>A</AvatarFallback>
//           </Avatar>

//           {/* السهم */}
//           {open ? (
//             <ChevronUp className="h-4 w-4 text-gray-600" />
//           ) : (
//             <ChevronDown className="h-4 w-4 text-gray-600" />
//           )}
//         </button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className={"w-36  "}>
//        <DropdownMenuItem>
//          <LogoutButton />
//        </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Settings, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import LogoutButton from "../store/LogoutButton";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
          
           <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-black text-[#2D1B50]">محمد باتيس</span>
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">المدير العام</span>
          </div>

          {/* الأفاتار المحسن */}
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-2 ring-gray-50 group-hover:ring-[#FFC107] transition-all">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback className="bg-[#2D1B50] text-[#FFC107] font-bold">A</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2 p-2 rounded-2xl shadow-xl border-gray-100 bg-white" align="start">
        <DropdownMenuLabel className="text-right px-3 py-2 text-xs font-bold text-gray-400 uppercase">حساب الآدمن</DropdownMenuLabel>
        
        {/* <DropdownMenuItem className="flex items-center justify-end gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="font-bold text-sm">الملف الشخصي</span>
          <User size={18} className="text-gray-400" />
        </DropdownMenuItem> */}

        {/* <DropdownMenuItem className="flex items-center justify-end gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="font-bold text-sm">إعدادات النظام</span>
          <Settings size={18} className="text-gray-400" />
        </DropdownMenuItem> */}

        <DropdownMenuSeparator className="my-2 bg-gray-100" />
        
        <div className="p-1">
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}