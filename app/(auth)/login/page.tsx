
import LoginForm from '@/components/forms/login/Login';
import React from 'react'

const page = () => {
  return (
    <div className='flex  w-full mx-4  flex-col tablet:flex-row max-w-[1200px] bg-slate-50 rounded-b-2xl shadow-xl overflow-hidden shadow-primary6/10'>
        <div className='flex flex-col justify-center items-center tablet:w-1/2 px-6 py-12 tablet:px-14'>
            <LoginForm />
        </div>
        <div className='tablet:w-1/2 hidden tablet:flex relative'>
        <div className='bg-primary8/30 absolute top-0 left-0 z-[2] h-full w-full'></div>
          <img src='/images/authImage.webp' alt='logo' className='object-cover' />
        </div>
    </div>
  )
}

export default page