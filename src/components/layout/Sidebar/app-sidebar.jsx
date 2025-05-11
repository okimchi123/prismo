"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { items } from "@/models/navItems";
import { SearchInput } from "@/components/ui/input";

import { logout } from "@/services/user.service";
import { storeUser } from "@/hooks/state";
import Link from "next/link";
import clsx from "clsx";
const navItems = items;

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = storeUser((state) => state.user);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const defStyle = "";  

  return (
    <Sidebar className="select-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-2 select-none prismo">
            <img src="/icon.png" className="w-8" />
            prismo
          </SidebarGroupLabel>
          <SearchInput type="text" placeholder="Search" className="mb-4" />
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                  variant="normal"
                    asChild
                    className={clsx(
                      defStyle,
                      {
                        "bg-pink-100 text-[#F9617E]":
                          pathname === item.url,
                      }
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <SidebarMenuButton>
                  <User2 /> {user.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
