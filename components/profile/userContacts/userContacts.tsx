"use client"

import { Icon } from "@iconify/react/dist/iconify.js"

const UserContacts = ({myContacts, onlineContacts, handleRemoveContacts, dummyContacts}:any) => {
  return (
    <div className="bg-primary/10 w-full  mb-5 py-5 px-6 rounded-[10px]">
    {myContacts.length ? (
      <div className="flex items-center justify-start gap-5 flex-wrap">
      { myContacts.map((contact: any) => (
        <div key={contact._id} className="flex flex-col items-center justify-center relative group border-[1px] border-black/5  w-[200px] h-[200px] bg-white/10 rounded-[10px] p-2">
          {contact.profileImage ? (
            <div className="size-18 bg-base-100 p-2 rounded-full flex items-center justify-center relative">
              <div className="absolute  h-full w-full border-3  border-primary  rounded-full opacity-0 group-hover:opacity-75 transition-all"></div>
              {onlineContacts.includes(contact._id) && <span className='absolute h-3 w-3 rounded-full bg-green-700 top-0 left-9 border-[1px] border-green-300'></span>}
            <img
              src={contact.profileImage}
              alt=""
              className="size-[90%] rounded-full"
            />
          </div>
          ):(
            <div className="size-18 bg-base-100 p-2 rounded-full relative flex items-center justify-center">
              <div className="absolute  h-full w-full border-3  border-primary  rounded-full opacity-0 group-hover:opacity-75"></div>
              {onlineContacts.includes(contact._id) && <span className='absolute h-3 w-3 rounded-full bg-green-700 top-0 left-9 border-[1px] border-green-300'></span>}

            <Icon
              icon="icon-park-twotone:user"
              className="h-full w-full opacity-45"
            />
          </div>
          )
        }
          <h1 className="font-semibold text-[13px]">{contact.username}</h1>
          <h3 className="text-[10px] text-primary/50">{contact.email}</h3>
          <button onClick={()=>handleRemoveContacts(contact)} className="py-1 px-2 bg-primary/80 hover:bg-primary mt-2 rounded-[5px] text-[11px] text-base-100 font-semibold cursor-pointer">remove</button>
        </div>
      ))}
     </div>
    ) : (
      <div>
        <p className="pb-3">You don't have contacts yet 😞</p>
        <div className="avatar-group  space-y-3 flex-wrap">
          {dummyContacts.map((contact: any, i: number) => (
            <div
              key={i}
              className=" flex flex-col gap-y-1 items-center mx-3"
            >
              <div className="w-12 h-12 bg-base-100 p-2 rounded-full">
                <Icon
                  icon="icon-park-twotone:user"
                  className="h-full w-full opacity-45"
                />
              </div>
              <p className="text-[12px]  opacity-55">dummy user</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  )
}

export default UserContacts