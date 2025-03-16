import React from 'react'


const  chatSkeletons = Array.from({length: 10})
const ChatContainerSkeleton = () => {
  return (
    <div className='flex-1 p-4 bg-base-300 overflow-y-scroll'>
     {
         chatSkeletons.map((message:any, index:number)=>(
                    !(index%2 ===0)?
                    (
                    <div className="chat chat-end bg-primary/10 w-[30%] flex rounded-2xl px-3 mb-3">
                    <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    </div>
                    </div>
                    )
                    :(
                      <div className="chat chat-start bg-primary/10 w-[30%] flex rounded-2xl px-3 mb-3 ml-auto">
                        <div className="flex w-full flex-col gap-4">
                        <div className="flex flex-1 items-center gap-4">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
     ))
     }
    </div>
  )
}

export default ChatContainerSkeleton