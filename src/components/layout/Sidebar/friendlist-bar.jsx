"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function FriendListBar() {
    return(
        <Sidebar side="right" className="select-none">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg mb-2 flex items-center gap-1 select-none prismo">
                        <h1 className="mb-[6px]">Friends</h1>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="friends">
                                <SidebarMenuButton variant="normal" asChild className="w-full">
                                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 cursor-pointer">
                                        <span>Friend 1</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* Add more friends here */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}