import UserLogin from "@/models/UserLogin";
import { connectDB } from "@/lib/mongodb";

import crypto from "crypto";
import { ServerClient } from "postmark";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
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

  const link = process.env.NEXTBASE_URL + `/reset-password/${resetToken}`;
  const postmarkClient = new ServerClient(
    process.env.POSTMARK_SERVER_TOKEN as string
  );

  const emailData = {
    From: process.env.POSTMARK_FROM_EMAIL as string,
    To: email as string,
    Subject: "Password Reset",
    HtmlBody: `
        Hello, 

        We've received a request to for a password resent for ${email}.

        Please use the link to resent your password: ${link}

        Kind regards, 
        Support Team
    `,
    MessageStream: "outbound",
  };

  await postmarkClient
    .sendEmail(emailData)
    .then(() => {
      return new NextResponse("Password reset successful", { status: 200 });
    })
    .catch(async () => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return new NextResponse("Failed sending email. Try again.", {
        status: 400,
      });
    });

    try {
        await existingUser.save();
        return new NextResponse("Email has been sent for resetting", {
            status: 200
        })
    } catch(error) {
        return new NextResponse(String(error), {
            status: 500
        })
    }
};
