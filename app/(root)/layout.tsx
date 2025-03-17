"use client";

import NavSide from "@/components/NavSide/NavSide";
import { useMessageStore } from "@/components/providers/messageProvider";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Router = useRouter();
  const { data: session }:any = useSession();
  const { currentUser,contacts, setContacts, setCurrentUser,selectedUser, setSelectedUser } = useCurrentUserStore();

  useEffect(() => {
    if (session) {
      Router.push("/chat");
    }else{
      Router.push("/login");
    }
  }, []);



  return (
    <main data-theme="" className="h-screen flex">
    <NavSide />
      {children}
    </main>
  );
}
