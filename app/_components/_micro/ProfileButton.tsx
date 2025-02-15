import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getUser } from "@/actions/user";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { userProfile } from "@/interfaces/User";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";

export default async function ProfileButton() {
  const session = await getServerSession();

  let userDetails : userProfile = ({
    email: "",
    name: "",
    surname: "",
    image: "",
  });

  if (session?.user?.email) {
    userDetails = await getUser(session.user.email);
    console.log(session)
  }

  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userDetails.image} />
              <AvatarFallback>
                {userDetails.name[0]}
                {userDetails.surname[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/subscription"}>Subscription</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/app/overview"}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ):
      <div className="flex gap-3">
          <Button>
            <Link href={"/login"}>Get Started!</Link>
          </Button>
        </div>}
    </div>
  );
}
