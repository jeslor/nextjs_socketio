"use client";
import { Icon } from "@iconify/react";
import React from 'react'

const ButtonMain = ({title, link}:any) => {
  return (
   link ? <a href={link} className='flex btn'>{title} <Icon className="-rotate-100 " icon="solar:arrow-down-broken" width="34" height="24" /></a> : <button className='flex btn'>{title} <Icon className="-rotate-100 " icon="solar:arrow-down-broken" width="34" height="24" /></button>
  )
}

export default ButtonMain