"use client"
import { useUserContext } from '@/components/providers/userProvider'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
    const {user} = useUserContext()
  return (
    <div>
        <div>
            <Input type='text' value={user?.username}/>
        </div>
    </div>
  )
}

export default page