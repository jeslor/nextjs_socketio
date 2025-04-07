import UserModel from "@/lib/models/user.model";
import { ConnectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const { email, password, confirmPassword } = await request.json();
  if (!email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    await ConnectToDB();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    const hashedPassword = await hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
