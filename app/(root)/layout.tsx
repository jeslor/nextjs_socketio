"use client";

import { useCurrentUserStore } from "@/components/providers/useProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Router = useRouter();
  const { currentUser, setCurrentUser, logoutUser } = useCurrentUserStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      Router.push("/chat");
    }else{
      Router.push("/login");
    }
  }, []);

  

  return (
    <main data-theme="aqua" className="h-screen flex">
      <aside className="h-full flex flex-col justify-between gap-y-6 py-10 px-3 w-fit border-r-[1px] border-primary/20">
        <div className="flex flex-col gap-y-4">
          <Link
            className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
            href="/profile"
          >
            <Icon className="size-7" icon="fluent-mdl2:profile-search" />
          </Link>
          <Link
            className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
            href="/chat"
          >
            <Icon className="size-7" icon="mynaui:chat-messages" />
          </Link>
          <Link
            className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
            href="/settings"
          >
            <Icon className="size-7" icon="lets-icons:setting-line" />
          </Link>
          <Link
            className="cursor-pointer p-3.5 rounded hover:bg-base-200 flex justify-center items-center"
            href="/settings"
          >
            <Icon className="size-7" icon="fluent-mdl2:favorite-list" />
          </Link>
        </div>
        <button
          onClick={logoutUser} // Call logout function properly
          className="self-end mb-8 p-3.5 rounded hover:bg-base-200 flex justify-center items-center cursor-pointer"
        >
          Logout
        </button>
      </aside>
      {children}
    </main>
  );
}
