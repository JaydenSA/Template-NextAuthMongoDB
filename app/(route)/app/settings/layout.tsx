"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Profile",
    url: "#profile",
  },
  {
    title: "Account",
    url: "#account",
  },
  {
    title: "Marketing",
    url: "#marketing",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();
  pathname = pathname.split("/")[2];
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle className="text-2xl">Settings</CardTitle>
        <CardDescription>
          Manage your account settings and set e-mail preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-4">
        <nav className="col-span-1 flex flex-col gap-2">
          {items.map((item) => (
            <Button
              key={item.title}
              className={
                item.title.toLowerCase() === pathname
                  ? "bg-primary text-white rounded-md hover:bg-primary hover:text-white hover:underline"
                  : "bg-white text-black shadow-none flex gap-2 justify-start hover:text-white hover:underline"
              }
            >
              <Link href={item.url}>
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className={`col-span-1 md:col-span-3 py-4 md:py-0 md:px-8 w-full`}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
