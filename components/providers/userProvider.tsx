"use client"
import { useSession } from "next-auth/react";
import {createContext, useContext, useEffect, useState} from "react"

const UserContext = createContext<any>({
    user:null,
    setUser:()=>{}
})

export const useUserContext  = ()=>{
    return useContext(UserContext);
}


export default ({children}:any)=>{
    const [user, setUser ] = useState<any>(null)
    const {data:session} = useSession()

    console.log(session);
    
    

    useEffect(()=>{
        if(session){
            setUser(session?.user)
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

}