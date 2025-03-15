"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default   function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const Router = useRouter();
    const {data:session} = useSession();

    useEffect (()=>{
        if(session){
            Router.push("/chat")
        }else{
            Router.push("/login")
        }
    }
    ,[])
    
    return<main className="bg-slate-100 flex justify-center items-center h-screen w-screen">
        {children}
    </main>
  }