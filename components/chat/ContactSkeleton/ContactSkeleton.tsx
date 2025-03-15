import React from 'react'

const  Skeletons = Array.from({length: 7}).map((_, i) => i)
const ContactSkeleton = () => {
return (
  <div className="flex flex-col gap-x-4 gap-y-10">
    {Skeletons.map((item: any, i: number) => (
      <div key={i} className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4 w-full">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
)
}

export default ContactSkeleton