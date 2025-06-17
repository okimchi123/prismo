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
import { darumadrop_one } from "@/components/ui/fonts";
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
      <AppSidebar />
      <main className="w-full px-2">
        <nav className="w-full flex py-2 justify-between">
          <figure className="flex border">
            
            <SidebarTrigger className="md:hidden" icon="/hamburger.svg" />
            <h1 className={`${darumadrop_one.className} prismo`}>prismo</h1>
          </figure>
          <FriendListBar />
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
}
