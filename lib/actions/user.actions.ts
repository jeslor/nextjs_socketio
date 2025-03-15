"use server"
import { ConnectToDB } from "../mongoose"
import UserModel from "@/lib/models/user.model"



export const getCurrentUser = async (email: string) => {
    
    try {
        await ConnectToDB()
        const user = await UserModel.findOne({email}).select("-password")
        return JSON.parse(JSON.stringify({status:200, message: "User Found", data:user}))
    } catch (error) {
        console.log(error);
        
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}))
    }
}

export const getOtherUsers = async (userId:string) => {
    try {
        await ConnectToDB()
        const users = await UserModel.find({_id: {$ne: userId}}).select("-password")
        
        return JSON.parse(JSON.stringify({status:200, message: "Users Found", data:users}))
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}))
    }
}