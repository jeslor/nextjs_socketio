import UserModel from "@/lib/models/user.model";
import { ConnectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const { token } = await request.json();

  console.log("Token received:", token);

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  try {
    await ConnectToDB();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await UserModel.findOne({
      passwordToken: hashedToken,
      passwordTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        message: "Invalid or expired token",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Token is valid",
      status: 200,
      userEmail: user.email,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
