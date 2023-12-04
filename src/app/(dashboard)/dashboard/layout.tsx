"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User } from "lucide-react";
import useSWR from "swr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, data, error } = useSWR("/api/auth/me");

  return (
    <>
      <nav className=" sticky top-0 w-full h-20 border-b grid grid-flow-col px-6 ">
        <div className=" grid justify-end items-center">
          {isLoading && (
            <Button variant="outline">
              <span className=" grid grid-flow-col gap-2  items-center">
                <Avatar className=" h-12 w-12">
                  <AvatarFallback className="  ">
                    <Skeleton className=" h-full w-full" />
                  </AvatarFallback>
                </Avatar>
                <Skeleton className=" h-6   w-28" />
              </span>
            </Button>
          )}
          {data && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span className=" grid grid-flow-col gap-2  items-center">
                    <Avatar className=" h-12 w-12">
                      <AvatarFallback className=" text-base font-semibold">
                        {data.firstName.charAt(0).toUpperCase()}{" "}
                        {data.lastName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className=" text-lg">
                      {data.firstName} {data.lastName}
                    </h2>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      <main className=" container h-full">{children}</main>
    </>
  );
}
