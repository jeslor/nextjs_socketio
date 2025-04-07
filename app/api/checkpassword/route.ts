import UserModel from "@/lib/models/user.model";
import { ConnectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
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
        message: "Invalid email or password",
        status: 401,
      });
    }
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        message: "Password incorrect",
        confirmedPassword: false,
        status: 200,
      });
    }

    if (isPasswordValid) {
      console.log("Password is correct");

      return NextResponse.json({
        message: "Password is correct",
        confirmedPassword: true,
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
