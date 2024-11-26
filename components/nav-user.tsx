"use client";

import {
  ChevronsUpDown,
  CircleUserRound,
  CreditCard,
  Laptop,
  LogOut,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function NavUser({
  name,
  email,
  avatar,
}: {
  name: string | null;
  email: string | null | undefined;
  avatar: string | null;
}) {
  const { isMobile } = useSidebar();
  const { setTheme, theme } = useTheme();
  console.log(theme);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={avatar ?? undefined}
                  alt={name ?? undefined}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={avatar ?? undefined}
                    alt={name ?? undefined}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUserRound />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton>
                <div className="flex flex-row items-center justify-center gap-2">
                  <LogOut />
                  Log out
                </div>
              </SignOutButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-gray-500">
              Preferences
            </DropdownMenuLabel>
            <div className="flex flex-row items-center justify-between relative cursor-default select-none gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              <div>Theme</div>
              <div className="flex flex-row items-center justify-evenly py-1.5 px-1 border rounded-full ">
                <Button
                  variant={"ghost"}
                  onClick={() => setTheme("system")}
                  className={`w-2 h-2 ${
                    theme === "system" ? "text-black" : "text-gray-400"
                  }`}
                >
                  <Laptop />
                </Button>
                <Button
                  onClick={() => setTheme("light")}
                  variant={"ghost"}
                  className={`w-2 h-2 ${
                    theme === "light" ? "text-black" : "text-gray-400"
                  }`}
                >
                  <Sun />
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setTheme("dark")}
                  className={`w-2 h-2 ${
                    theme === "dark" ? "text-black" : "text-gray-400"
                  } dark:${theme === "dark" ? "text-white" : "text-gray-500"}`}
                >
                  <Moon />
                </Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
