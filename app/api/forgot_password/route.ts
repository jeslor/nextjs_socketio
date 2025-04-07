import UserModel from "@/lib/models/user.model";
import { ConnectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

export async function POST(request: Request) {
  const { email } = await request.json();
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC as string,
    process.env.MJ_APIKEY_PRIVATE as string
  );

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    await ConnectToDB();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { resetToken, passwordToken, passwordTokenExpiry } =
      user.generateResetToken();
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset_password/${resetToken}`;

    await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MJ_FROM_EMAIL,
              Name: process.env.MJ_FROM_NAME,
            },
            To: [
              {
                Email: email,
              },
            ],
            Subject: "Password Reset Request",
            HTMLPart: `
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
              <h2 style="color: #1a73e8;">Reset Your Password</h2>
              <p>Hi there,</p>
              <p>We received a request to reset your password. Click the button below to continue:</p>
              <p>
                <a href="${resetUrl}" style="
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #1a73e8;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                ">Reset Password</a>
              </p>
              <p>If you didn’t request this, you can safely ignore this email — your password won’t change.</p>
              <p>Thanks,<br>The ${
                process.env.MJ_FROM_NAME || "Support"
              } Team</p>
            </div>
                      `,
            TextPart: `
            Hi there,

            We received a request to reset your password. Use the link below to continue:
            ${resetUrl}

            If you didn’t request this, you can ignore this email.

            Thanks,
            The ${process.env.MJ_FROM_NAME || "Support"} Team
            `,

            CustomID: "PasswordReset",
          },
        ],
      })
      .then(async (result: any) => {
        if (result.body.Messages[0].Status !== "success") {
          throw new Error("Failed to send email");
        }
        await UserModel.findByIdAndUpdate(user._id, {
          passwordToken,
          passwordTokenExpiration: passwordTokenExpiry,
        }).then(() => {
          return NextResponse.json({
            message: "Reset password link sent to your email",
            status: 200,
          });
        });
      })
      .catch(async (err: any) => {
        console.error(err);
        await UserModel.findByIdAndUpdate(user._id, {
          passwordToken: "",
          passwordTokenExpiration: "",
        }).then(() => {
          return NextResponse.json({
            message: "Failed to send email",
            status: 500,
          });
        });
      });

    // Generate a reset password token and send it to the user's email
    // ...

    return NextResponse.json(
      { message: "Reset password link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
