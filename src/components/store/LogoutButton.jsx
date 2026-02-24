"use client";

import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await fetch("/api/Account/logout", {
        method: "POST",
      });

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="icon"
      disabled={loading}
      className="text-gray-700 hover:text-secondary transition-colors cursor-pointer w-full"
    >
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-secondary" />
      ) : (
        <div className="flex justify-center items-center gap-2">
          تسجيل الخروج
          <LogOut className="h-6 w-6 rotate-180" />
        </div>
      )}
    </Button>
  );
}

export default LogoutButton;
