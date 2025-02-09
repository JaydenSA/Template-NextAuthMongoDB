"use server";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link";
import React from "react";

import { getUser } from "@/actions/user";
import { userProfile } from "@/interfaces/User";
import SignOutButton from "./_micro/SignOutButton";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Services",
    link: "/services",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  let userDetails : userProfile = {
    email: "",
    name: "",
    surname: "",
    image: "",
  };
  
  if ( session ) {
    userDetails = await getUser(session?.user?.email as string);
  }

  console.log(session);

  return (
    <div
      className="flex justify-between items-center shadow-md bg-white 
                px-4 md:px-8 lg:px-24 xl:px-32 2xl:px-36 py-4
                absolute top-0 left-0 right-0 z-10"
    >
      <div>
        <h1 className="text-2xl font-bold">My App</h1>
      </div>

      <div className="flex items-center gap-3">
        {navLinks.map((link, index) => (
          <div key={index}>
            <Link href={link.link} className="mx-2">
              {link.title}
            </Link>
          </div>
        ))}
      </div>

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
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-3">
          <Button>
            <Link href={"/login"}>Get Started!</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
