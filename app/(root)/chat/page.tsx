"use client"

import { useSession } from "next-auth/react"

const page = () => {

  
  return (
    <div className="flex">
      <aside>
        <h2>Users</h2>
      </aside>
      <div>
        <h2>Chat</h2>
      </div>
    </div>
  )
}

export default page