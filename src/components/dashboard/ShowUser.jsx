import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cookies } from "next/headers";

async function ShowUser () {
    // const cookiesStore =await cookies();
    // const UserName = cookiesStore.get("username")?.value || "غير معروف";
  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatar.png" alt="admin" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default ShowUser;
