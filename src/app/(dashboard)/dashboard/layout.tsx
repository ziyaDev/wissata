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
import { sessionOptions } from "@/utils/session-config";
import { siteNavigations } from "@/utils/sitenavs";
import { IronSessionData, getIronSession } from "iron-session";
import { LogOut, User } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );

  return (
    <>
      <nav className=" fixed bg-background/60  z-50  bg-opacity-30 backdrop-blur-lg top-0 w-full h-20 border-b grid grid-flow-col px-6 ">
        <div className=" grid  grid-flow-col justify-between items-center">
          <div className=" flex flex-wrap  gap-x-4">
            {siteNavigations.map((site, i) => {
              return (
                <Button key={i} className=" text-lg" variant={"link"} asChild>
                  <Link href={site.link}>{site.label}</Link>
                </Button>
              );
            })}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className=" grid grid-flow-col gap-2  items-center">
                  <Avatar className=" h-12 w-12">
                    <AvatarFallback className=" text-base font-semibold">
                      {user.firstName.charAt(0).toUpperCase()}{" "}
                      {user.lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className=" text-lg">
                    {user.firstName} {user.lastName}
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
        </div>
      </nav>
      <main className=" container h-full mt-20 pb-8">{children}</main>
    </>
  );
}
