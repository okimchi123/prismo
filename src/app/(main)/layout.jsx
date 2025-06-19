"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar/app-sidebar";
import { FriendListBar } from "@/components/layout/Sidebar/friendlist-bar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { storeUser } from "@/hooks/state";
import { listenToUserProfile } from "@/services/user.service";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Loading from "@/components/Loading";
import Image from "next/image";

export default function Layout({ children }) {
  const router = useRouter();
  const setUser = storeUser((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = listenToUserProfile(setUser, (error) => {
      router.push("/");
      console.error("Error:", error);
    });

    return () => unsubscribe();
  }, [setUser]);

  const loadingAuth = useAuthRedirect("dashboard");
  if (loadingAuth) return <Loading />;
  return (
    <SidebarProvider>
      <main className="w-full flex justify-between gap-2 relative">
        <AppSidebar />
        <SidebarTrigger className="md:hidden absolute left-1 top-[14px]" icon="/hamburger.svg" />
        {children}
      <FriendListBar />  
      </main>
    </SidebarProvider>
  );
}
