"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useState } from "react";

export default function UserMenu() {
      const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100 transition">
          <span className="text-sm font-medium text-gray-800">admin</span>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="admin" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>

          {/* السهم */}
          {open ? (
            <ChevronUp className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          className="text-red-600 cursor-pointer flex gap-2 focus:text-red-600"
          onClick={() => {
            console.log("logout");
          }}
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
