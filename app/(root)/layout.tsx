"use client";

import NavSide from "@/components/NavSide/NavSide";
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
  const { currentUser,setContacts, setCurrentUser,contacts } = useCurrentUserStore();

  useEffect(() => {
    if (session) {
      Router.push("/chat");
    }else{
      Router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (session) {
      setCurrentUser(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (currentUser) {
      setContacts(currentUser._id);
    }
  }, [currentUser]);


  return (
    <main data-theme="luxury" className="h-screen flex">
    <NavSide />
      {children}
    </main>
  );
}
