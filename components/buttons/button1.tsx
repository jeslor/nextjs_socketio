"use client";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from 'react'

const ButtonMain = ({ link=null, title }:any) => {
  let [currLink, setCurrLink] = useState<string>('');
  const {data:session} = useSession();

  useEffect(() => {
      if(link){
          setCurrLink(link)
      }else{
        if(session){
          setCurrLink('/chat');
        }else{
          setCurrLink('/login');
        }
      }

  }, [session])


  console.log(currLink);
  


    return currLink ? (
      <a href={currLink} className="flex mainBtn group relative pr-[50px]">
        {title}
        <Icon className="absolute right-[17px] -rotate-100 group-hover:right-[10px] transition-all" icon="solar:arrow-down-broken" width="34" height="24" />
      </a>
    ) : (
      <button className="flex mainBtn">
        {title}
        <Icon className="absolute  right-[17px] -rotate-100 group-hover:right-[10px] transition-all" icon="solar:arrow-down-broken" width="34" height="24" />
      </button>
    );
  };

  export default ButtonMain