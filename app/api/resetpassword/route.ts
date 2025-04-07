import UserModel from "@/lib/models/user.model";
import { ConnectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    await ConnectToDB();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const resetToken = user.generateResetToken();

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
