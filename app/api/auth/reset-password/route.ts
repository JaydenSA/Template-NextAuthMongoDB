import UserLogin from "@/database/models/UserLogin";
import { connectDB } from "@/lib/mongodb";

import bcrypt from "bcryptjs"

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  await connectDB();

  const existingUser = await UserLogin.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashedPassword;

  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;
  
  try {
    await existingUser.save();
    return new NextResponse("User's password has been reset.", { status: 200 })
  } catch ( error: any ) {
    return new NextResponse(error, { status: 500 })
  }
  
};
