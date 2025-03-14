"use client"

import { useSession } from "next-auth/react"

const page = () => {
  const {data:session} = useSession()

  if(!session){
    return (
      <div>Not Authenticated</div>
    )
  }

  console.log(session);
  
  return (
    <div>Chate</div>
  )
}

export default page