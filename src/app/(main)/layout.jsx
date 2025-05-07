'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/Sidebar/app-sidebar"
import { useEffect } from "react";
import { userAuth } from "@/services/auth";
import { useRouter } from 'next/navigation';
import { storeUser } from "@/hooks/state";

export default function Layout({ children }) {
  const router = useRouter()
  const setUser = storeUser((state) => state.setUser);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await userAuth()
        setUser(data.user)
      } catch (error) {
        router.push('/')
      }
    }
    loadUser();
  }, []);

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
