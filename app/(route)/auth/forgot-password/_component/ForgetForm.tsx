"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { status: sessionStatus } = useSession()
  const [buttonStatus, setButtonStatus] = useState("Reset Password");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setButtonStatus("loading");

    const email = formData.get("email");
    console.log(email);

    try {
      console.log("Getting into try")
      const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email
          }),
      });

      if (res.status === 400) {
          console.log("User is not yet registered")
      } else if (res.status === 200) {
          console.log("User is redirect to login page after success")
          router.push("/auth/login")
      }
  } catch (e) {
      console.log(e)
  }

    // Add your logic here
    setButtonStatus("Sent!");
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/app/overview");
    }
  }, [sessionStatus, router])
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex justify-center text-center">
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="flex flex-col ">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="johnsnow@example.com"
                className="mb-4"
                required
              />
              <Button type="submit" className="w-full">
                {buttonStatus}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
