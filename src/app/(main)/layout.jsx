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
import { useIsMobile } from "@/hooks/use-mobile";
import { darumadrop_one } from "@/components/ui/fonts";
import Image from "next/image";

export default function Layout({ children }) {
  const router = useRouter();
  const setUser = storeUser((state) => state.setUser);
  const IsMobile = useIsMobile();

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
      <main className="w-full flex justify-center md:justify-between gap-2 relative">
        <AppSidebar />
        <SidebarTrigger
          className="md:hidden fixed z-101 left-1 top-[12px]"
          icon="/hamburger.svg"
        />
        <section className="relative flex flex-col items-center">
          {IsMobile && (
            <nav className="w-full sticky top-0 z-100 flex bg-[#E8E8E8] py-2">
              <h1 className={`${darumadrop_one.className} prismo text-[20px] ml-8.5`}>
                prismo
              </h1>
            </nav>
          )}
          {children}
        </section>

        <FriendListBar />
      </main>
    </SidebarProvider>
  );
}
