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
  const { data: session, status: sessionStatus }: any = useSession();
  const {
    setCurrentUser,
    currentUser,
    setContacts,
    contacts,
    selectedUser,
    setSelectedUser,
  } = useCurrentUserStore();
  const { mySocket } = useCurrentUserStore();
  const {
    setMessages,
    listenToMesages,
    unsubscribeToMessages,
    setNotifications,
  } = useMessageStore();

  useEffect(() => {
    if (!session) {
      Router.push("/login");
    }
  }, []);

  useEffect(() => {
    // if (session) {
    //   let user = session.user;
    //   if (user) {
    //     if (user.email) {
    //       setCurrentUser(user.email);
    //     }
    //   } else {
    //     Router.push("/login");
    //   }
    // }
    if (sessionStatus === "authenticated") {
      let user = session.user;
      if (user) {
        if (user.email) {
          setCurrentUser(user.email);
        }
      } else {
        Router.push("/login");
      }
    }
  }, [sessionStatus]);

  useEffect(() => {
    if (currentUser) {
      setContacts(currentUser._id);
    }
  }, [currentUser?._id]);

  useEffect(() => {
    if (currentUser) {
      setNotifications(currentUser);
    }
  }, [currentUser?._id]);

  useEffect(() => {
    if (typeof window !== "undefined" && contacts.length > 0) {
      let selectedUser = localStorage.getItem("selectedUser");
      if (selectedUser) {
        selectedUser = JSON.parse(selectedUser);
        setSelectedUser(selectedUser);
      } else {
        setSelectedUser(contacts[0]);
      }
    }
  }, [contacts]);

  useEffect(() => {
    if (currentUser && selectedUser) {
      setMessages(currentUser._id, selectedUser._id);
    }
  }, [selectedUser?._id]);

  useEffect(() => {
    if (currentUser) {
      setNotifications(currentUser);
    }
  }, [mySocket]);

  useEffect(() => {
    listenToMesages();
    return () => {
      unsubscribeToMessages();
    };
  }, [mySocket]);

  return (
    <main
      className="h-screen w-screen overflow-y-hidden flex pb-[50px]  tablet:pb-0"
      data-theme={currentUser?.theme}
    >
      <NavSide />
      {children}
    </main>
  );
}
