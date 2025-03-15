"use client"
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const {data:session} = useSession()
    const [user, setUser] = useState<any>()
    console.log(session);
    

    useEffect(()=>{
        if(session){
            setUser(session?.user)
        }
    }
    ,[])

    console.log(user);
    



    
  return (
    <div>
        <div>
            <Input type='text' value={user?.username}/>
        </div>
    </div>
  )
}

export default page