"use client"
import React, { useEffect } from 'react'
import { useCurrentUserStore } from './providers/userProvider'

const UserSetter = ({user}:any) => {
    const {setCurrentUser} = useCurrentUserStore()

    useEffect(() => {
        setCurrentUser(user)
    }, [user])
  return (
    <></>
  )
}

export default UserSetter