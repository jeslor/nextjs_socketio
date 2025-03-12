"use client";
import { Icon } from "@iconify/react";
import React from 'react'

const ButtonMain = ({ link, title }:any) => {
    return link ? (
      <a href={link} className="flex btn group relative pr-[50px]">
        {title}
        <Icon className="absolute right-[17px] -rotate-100 group-hover:right-[10px] transition-all" icon="solar:arrow-down-broken" width="34" height="24" />
      </a>
    ) : (
      <button className="flex btn">
        {title}
        <Icon className="absolute  right-[17px] -rotate-100 group-hover:right-[10px] transition-all" icon="solar:arrow-down-broken" width="34" height="24" />
      </button>
    );
  };

  export default ButtonMain