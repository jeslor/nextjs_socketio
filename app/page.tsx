import ButtonMain from '@/components/buttons/button1'
import BackgroundCanvas from '@/components/homeBackground/homeBackground'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-gray-900 via-indigo-800 to-black flex flex-col items-center justify-center gap-y-6'>
      <h1 className='text-[47px] text-white/60 font-extrabold'>Next Chat App</h1>
      <ButtonMain title='Get Started' link='/auth/login' />
    </div>
  )
}

export default page