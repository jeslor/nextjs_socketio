"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      Router.push("/login");
    }
    if (sessionStatus === "authenticated") {
      const user = session.user;
      if (user) {
        if (user.email) {
          Router.push("/chat");
        }
      }
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return (
      <div className="h-screen w-screen fixed bg-slate-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="bg-slate-100 flex justify-center items-center h-screen w-screen">
      {children}
    </main>
  );
}
