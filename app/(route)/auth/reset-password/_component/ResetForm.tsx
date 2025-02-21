"use client";

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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ResetPasswordForm({ params }: any) {
  console.log(params.token);
  const router = useRouter();

  const [error, setError] = useState("")
  const [verified, setVerified] = useState("false");

  const { status: sessionStatus } = useSession();
  const [buttonStatus, setButtonStatus] = useState("Reset Password");

  const handleSubmit = async (formData: FormData) => {
    setButtonStatus("loading");

    const email = formData.get("email");

    console.log(email)
    
    setButtonStatus("Sent!");
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/app/overview");
    }
  }, [sessionStatus, router]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex justify-center text-center">
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          {error !== "" && <CardDescription>
            {error}
          </CardDescription>}
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
