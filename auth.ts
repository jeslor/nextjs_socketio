
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ConnectToDB } from "./lib/mongoose";
import User from "@/lib/models/user.model";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter your credentials.");
          }
      
          await ConnectToDB();
          const user = await User.findOne({ email: credentials.email });
      
          if (!user) {
            throw new Error("No user found with this email.");
          }
      
          const isValid = await compare(String(credentials.password), String(user.password));
          if (!isValid) {
            throw new Error("Invalid email or password.");
          }
      
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
      
        } catch (error: any) {
          console.error("Auth Error:", error.message);
          throw new Error(error.message); // ✅ Send error message to frontend
        }
      }
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },

})





