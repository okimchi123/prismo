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
import Image from "next/image";
import { logout } from "@/services/user.service";
import { storeUser } from "@/hooks/state";
import Link from "next/link";
import clsx from "clsx";
import { darumadrop_one } from "@/components/ui/fonts";

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
    <Sidebar className="select-none md:w-[16rem] lg:w-[350px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-2 flex items-center gap-1 select-none prismo">
            <Image src="/icon.svg" width="18" height="18" alt="icon" />
            <h1 className={`${darumadrop_one.className} mb-[6px]`}>prismo</h1>
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
                        "bg-pink-100 text-[#F9617E] active:text-[#F9617E]":
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
