"use client";

import NavSide from "@/components/NavSide/NavSide";
import { useMessageStore } from "@/components/providers/messageProvider";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Router = useRouter();
  const { data: session }:any = useSession();
  const {setCurrentUser} = useCurrentUserStore();

  useEffect(() => {
    if (!session) {
      Router.push("/login");
    }else{
      toast.success('Welcome back!');

    }
  }, []);


  useEffect(() => {
    if (session) {
      setCurrentUser(session.user.email);
    }
  }, [session]);




  return (
    <main className="h-screen flex">
    <NavSide />
      {children}
    </main>
  );
}
