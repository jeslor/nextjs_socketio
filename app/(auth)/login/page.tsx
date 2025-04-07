"use client";
import LoginForm from "@/components/forms/login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { data: session, status: sessionStatus } = useSession();
  const Router = useRouter();

  useEffect(() => {
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
    <div className="flex  w-full mx-4  flex-col tablet:flex-row max-w-[1200px] bg-slate-50 rounded-b-2xl shadow-xl overflow-hidden shadow-primary6/10">
      <div className="flex flex-col justify-center items-center tablet:w-1/2 px-6 py-12 tablet:px-14">
        <LoginForm />
      </div>
      <div className="tablet:w-1/2 hidden tablet:flex relative">
        <div className="bg-primary8/30 absolute top-0 left-0 z-[2] h-full w-full"></div>
        <img src="/images/authImage.webp" alt="logo" className="object-cover" />
      </div>
    </div>
  );
};

export default page;
