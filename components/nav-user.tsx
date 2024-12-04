"use client";

import {
  ChevronsUpDown,
  CircleUserRound,
  CreditCard,
  LogOut,
  Moon,
  Settings,
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
import { SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

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
              <DropdownMenuItem className="cursor-pointer">
                <div
                  onClick={() => redirect("/dashboard/profile")}
                  className="flex flex-row items-center gap-2 w-full"
                >
                  <CircleUserRound />
                  Profile
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div
                  onClick={() => redirect("/dashboard/settings")}
                  className="flex flex-row items-center gap-2 w-full"
                >
                  <Settings />
                  Settings
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <SignOutButton>
                <div className="flex flex-row items-center  gap-2 w-full">
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
              <div className="flex gap-x-1.5 rounded-full bg-gray-600/5 p-1 ring-1 ring-gray-600/5 light:ring-inset dark:bg-black/30 dark:ring-white/5">
                <Button
                  variant={"ghost"}
                  onClick={() => setTheme("light")}
                  className={`${
                    theme === "light"
                      ? "data-[focus-visible]:outline-focus relative size-5 flex-none rounded-full outline-none transition-colors bg-white text-gray-800 shadow-[0_1px_5px_-4px_rgba(19,19,22,0.4),0_2px_5px_rgba(34,42,53,0.06)] ring-1 ring-gray-900/10 dark:bg-gray-800 dark:text-gray-300 dark:ring-white/20"
                      : "data-[focus-visible]:outline-focus relative size-5 flex-none rounded-full outline-none transition-colors "
                  }`}
                >
                  <span className="absolute inset-[calc(-3/16*1rem)]"></span>
                  <Sun />
                </Button>
                <Button
                  onClick={() => setTheme("dark")}
                  variant={"ghost"}
                  className={`${
                    theme === "dark"
                      ? "data-[focus-visible]:outline-focus relative size-5 flex-none rounded-full outline-none transition-colors bg-white text-gray-800 shadow-[0_1px_5px_-4px_rgba(19,19,22,0.4),0_2px_5px_rgba(34,42,53,0.06)] ring-1 ring-gray-900/10 dark:bg-gray-800 dark:text-gray-300 dark:ring-white/20"
                      : "data-[focus-visible]:outline-focus relative size-5 flex-none rounded-full outline-none transition-colors "
                  }`}
                >
                  <span className="absolute inset-[calc(-3/16*1rem)]"></span>
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
