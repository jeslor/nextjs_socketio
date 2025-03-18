import ThemeSelector from '@/components/settings/ThemeSelector/ThemeSelector'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
     <div className='max-w-[1000px] w-full flex flex-col items-start justify-start pl-10 pr-4 pb-8 h-full overflow-y-scroll'>
      <ThemeSelector />
     </div>
    </div>
  )
}

export default page