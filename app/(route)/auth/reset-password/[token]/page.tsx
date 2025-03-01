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
import { useParams } from 'next/navigation'

export default function ResetPassword() {
  const params = useParams()
  const router = useRouter();

  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const { status: sessionStatus } = useSession();
  const [buttonStatus, setButtonStatus] = useState("Reset Password");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });

        if (res.status === 400) {
          setError("Invalid token or has expired")
          setVerified(true);
        } else if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (e) {
        return e
      }
    };
    verifyToken();
  }, [params.token]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/app/overview");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (formData: FormData) => {
    setButtonStatus("loading");

    const password = formData.get("password");
    console.log(password);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email: user?.email
        }),
      });

      if (res.status === 400) {
        setError("Something went wrong, please try again.");
      } else if (res.status === 200) {
        router.push("/auth/login");
      }
    } catch {
      setError("Error, try again.")
    }

    // Add your logic here
    setButtonStatus("Password Reset!");
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex justify-center text-center">
              <CardTitle className="text-2xl">Password Reset</CardTitle>
              {error !== "" && <CardDescription>{error}</CardDescription>}
              <CardDescription>
                {verified ? (
                  error ? ( <span>{error}</span> ) : ( <span>Please enter your new password</span> ) 
                ) : (
                  <span>Verifying token...</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit}>
                <div className="flex flex-col ">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
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
      </div>
    </div>
  );
}
