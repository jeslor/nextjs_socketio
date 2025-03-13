"use client";
import LoginForm from '@/components/forms/login/Login';
import React from 'react'

const page = () => {
  return (
    <div className='flex max-w-[1200px] bg-slate-50 rounded-b-2xl shadow-xl overflow-hidden shadow-primary6/10'>
        <div className='flex flex-col justify-center items-center w-1/2 p-12'>
            <LoginForm />
        </div>
        <div className='w-1/2'>
            <img src='/images/loginImage.webp' alt='logo' className=' ' />
        </div>
    </div>
  )
}

export default page