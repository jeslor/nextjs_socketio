import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/components/ToasterContext/ToasterContext";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/actions/user.actions";
import UserSetter from "@/components/UserSetter";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Chat app",
  description: "Talk and talk with your friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session:any = await auth();
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
        <ToasterContext />
          {/* {session && <UserSetter  />} */}
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
