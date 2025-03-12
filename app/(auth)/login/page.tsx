"use client";
import LoginForm from '@/components/forms/login/Login';
import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-2 max-w-[1200px] bg-slate-50 rounded-b-2xl shadow-xl overflow-hidden shadow-primary6/10'>
        <div className='flex flex-col justify-center items-center'>
            <LoginForm />
        </div>
        <div className='h-full overflow-hidden'>
            <img src='/images/loginImage.webp' alt='logo' className='h-full ' />
        </div>
    </div>
  )
}

export default page