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
  const { setCurrentUser, currentUser, setContacts, contacts,selectedUser, setSelectedUser } = useCurrentUserStore();
    const { mySocket } = useCurrentUserStore();
    const {  setMessages, listenToMesages, unsubscribeToMessages } = useMessageStore();

  useEffect(() => {
    if (!session) {
      Router.push("/login");
    }
  }, []);


  useEffect(() => {
    if (session) {
      setCurrentUser(session.user.email);
    }
  }, [session.user.email]);

  useEffect(() => {
    if (currentUser) {
      setContacts(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if(contacts){
      if (!selectedUser) {
        setSelectedUser(contacts[0]);
      }
    }
  }
  ,[contacts])


    useEffect(() => {
      if (currentUser && selectedUser) {
        setMessages(currentUser._id, selectedUser._id);
      }
    }, [selectedUser]);


      useEffect(() => {
        listenToMesages();
        return () => {
          unsubscribeToMessages();
        };
      }, [mySocket]);
      


  return (
    <main className="h-screen w-screen overflow-y-hidden flex pb-[50px]  tablet:pb-0" data-theme={currentUser?.theme}>
    <NavSide />
      {children}
    </main>
  );
}
