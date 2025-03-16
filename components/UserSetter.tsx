"use client"
import React, { useEffect } from 'react'
import { useCurrentUserStore } from './providers/userProvider'
import { useSession } from 'next-auth/react'
import { getCurrentUser, getOtherUsers } from '@/lib/actions/user.actions'


const UserSetter = () => {
    const {setCurrentUser, setContacts} = useCurrentUserStore()
    const{data:session}:any = useSession()

    const FetchUser = async () => {
        if(session){
          
            const data =  await getCurrentUser(session?.user?.email);
            if(data){
              const userId = data.data._id
              const contacts  = await getOtherUsers(userId )
              console.log(typeof contacts);
              
              

                if (contacts) {
                  console.log(data.data);
                  console.log(contacts.data);
                  setCurrentUser(data.data)
                  setContacts(contacts.data)
                }
            }
        }
    }

    useEffect(() => {
        FetchUser()
    }, [session])

  return (
    <></>
  )
}

export default UserSetter