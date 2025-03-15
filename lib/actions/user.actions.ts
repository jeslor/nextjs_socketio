"use server"
import UserModel from "@/lib/models/user.model"



export const getUsers = async (currentUser:any) => {
    try {
        const users = await UserModel.find({_id: {$ne: currentUser._id}})
        return users
    } catch (error) {
        console.log(error);
    }
}