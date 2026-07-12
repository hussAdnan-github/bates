// "use client";

// import { LogOut, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// function LogoutButton() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       await fetch("/api/Account/logout", {
//         method: "POST",
//       });

//       router.replace("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       onClick={handleLogout}
//       variant="ghost"
//       size="icon"
//       disabled={loading}
//       className="text-gray-700 hover:text-secondary transition-colors cursor-pointer w-full"
//     >
//       {loading ? (
//         <Loader2 className="h-6 w-6 animate-spin text-secondary" />
//       ) : (
//         <div className="flex justify-center items-center gap-2">
//           تسجيل الخروج
//           <LogOut className="h-6 w-6 rotate-180" />
//         </div>
//       )}
//     </Button>
//   );
// }

// export default LogoutButton;


"use client";

import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

 function LogoutButton({ isMobile = false }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/Account/logout", { method: "POST" });
       
      queryClient.clear();
      
      router.refresh();
      
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  // إذا كان في الموبايل (الشريط السفلي)
  if (isMobile) {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex flex-col items-center justify-center gap-1 flex-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin text-secondary" />
        ) : (
          <LogOut className="w-6 h-6 rotate-180" />
        )}
        <span className="text-[10px] font-bold">خروج</span>
      </button>
    );
  }

  // الشكل العادي (للديسك توب)
  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      disabled={loading}
      className="text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-secondary" />
      ) : (
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[13px] font-bold">تسجيل الخروج</span>
          <LogOut className="h-5 w-5 rotate-180" />
        </div>
      )}
    </Button>
  );
}

export default LogoutButton;