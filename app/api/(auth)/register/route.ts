import { ConnectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { hash } from "bcryptjs";

export const POST = async (req: Request, res: Response) => {
    try {
        await ConnectToDB();
        const {username, email, password} = await req.json();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const  harshedPassword = await hash(password, 10);
        const newUser = new User({ username, email, password: harshedPassword });
        await newUser.save();
        return NextResponse.json({ message: "User registered successfully", user:JSON.stringify(newUser), status: 200 });


        
    } catch (error:any) {
        console.log("Error registering user", error);
        return NextResponse.json({ message: "Error registering user", error:error.message, status: 500 });
        
    }
}