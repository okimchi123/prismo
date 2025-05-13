'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/Sidebar/app-sidebar"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { storeUser } from "@/hooks/state"
import { listenToUserProfile } from "@/services/user.service"
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Loading from "@/components/Loading"

export default function Layout({ children }) {
  const router = useRouter()
  const setUser = storeUser((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = listenToUserProfile(setUser, (error) => {
      router.push("/")
      console.error("Error:", error);
    });

    return () => unsubscribe();
  }, [setUser]);

  const loadingAuth = useAuthRedirect("dashboard");
  if (loadingAuth) return <Loading />;
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-white w-full">
      <SidebarTrigger className="md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  )
}
