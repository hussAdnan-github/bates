"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/Account/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-700 hover:text-secondary transition-colors cursor-pointer"
        >
          <LogOut className="h-6 w-6 rotate-180" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent dir="rtl" className={'bg-white'}>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد تسجيل الخروج</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction className={'bg-secondary'} onClick={handleLogout}>
            تسجيل الخروج
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutButton;
