import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/Sidebar/app-sidebar"

export default function Layout({ children }) {
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
