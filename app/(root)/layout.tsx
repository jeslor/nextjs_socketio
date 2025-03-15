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
  const { data: session } = useSession();
  const { currentUser,setContacts } = useCurrentUserStore();
  

  useEffect(() => {
    if(currentUser){
      setContacts(currentUser)
    }
  }, [currentUser])

  useEffect(() => {
    if (session) {
      Router.push("/chat");
    }else{
      Router.push("/login");
    }
  }, []);


  return (
    <main data-theme="abyss" className="h-screen flex">
    <NavSide />
      {children}
    </main>
  );
}
