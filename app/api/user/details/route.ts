import UserLogin from "@/database/models/UserLogin";
import { connectDB } from "@/lib/mongodb";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { email } = await request.json();

  await connectDB();

  const existingUser = await UserLogin.findOne({ email });

  return existingUser
  
};
