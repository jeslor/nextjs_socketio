import ButtonMain from '@/components/buttons/button1'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-gray-900 via-primary to-black flex flex-col items-center justify-center gap-y-6'>
      <div className='flex items-center gap-x-3'>
        <img src='/images/logo.webp' alt='logo' className='w-[100px] ' />
        <h1 className='text-[47px] text-white/60 font-extrabold -m'>Next chat App</h1>
      </div>
      <ButtonMain title='Get Started' link='/login' />
    </div>
  )
}

export default page