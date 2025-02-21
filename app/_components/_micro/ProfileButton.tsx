import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { getUserProfile } from "@/actions/userProfile";
import SignOutButton from "./SignOutButton";
import { UserProfileDocument } from "@/interfaces/UserProfile";

export default async function ProfileButton() {
  const session = await getServerSession();

  let userProfile : UserProfileDocument = ({
    user_email: "",
    first_name: "",
    last_name: "",
    image: "",
    phone_number: "",
  });

  if (session?.user?.email)  {
    userProfile = await getUserProfile(session.user.email);
  }

  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userProfile.image} />
              <AvatarFallback>
                {userProfile.user_email}
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
            <Link href={"/auth/login"}>Get Started!</Link>
          </Button>
        </div>}
    </div>
  );
}
