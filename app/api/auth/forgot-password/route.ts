import UserLogin from "@/models/UserLogin";
import { connectDB } from "@/lib/mongodb";

import crypto from "crypto"

import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email } = await request.json();

  await connectDB();

  const existingUser = await UserLogin.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email doesn't exist", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

  const passwordResetExpires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = process.env.NEXTBASE_URL + `/reset-password/${resetToken}`;

  console.log(resetUrl);

  return new Response(resetUrl, {
    status: 200,
  });
};
