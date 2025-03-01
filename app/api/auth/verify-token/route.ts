import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import UserLogin from "@/database/models/UserLogin";

export const POST = async (request: NextRequest) => {
  const { token } = await request.json();

  await connectDB();

  const hashedtoken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await UserLogin.findOne({
    resetToken: hashedtoken,
    resetTokenExpiry: { $gt: Date.now()}
  });

  if (!user) {
    return new NextResponse("Invalid token or has expired", {status: 400})
  };

  return new NextResponse(JSON.stringify(user), {status: 200});

};
