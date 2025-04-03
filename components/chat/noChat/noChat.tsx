"use client"

import { Icon } from "@iconify/react/dist/iconify.js"

const NoChat = () => {
  return (
    <div className="h-full flex  items-center justify-center ">
       <div className="flex flex-col items-center justify-center  px-4">
        <h3 className="text-[30px] font-extrabold">Ooooppss</h3>
            <p>No chat contact selected, select a contact to start chatting.</p>
            <Icon className="text-[70px] mt-4" icon="hugeicons:bubble-chat-cancel"   />
       </div>
    </div>
  )
}

export default NoChat