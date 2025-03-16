"use server";
import { ConnectToDB } from "../mongoose";
import Message  from "@/lib/models/message.model";
import User from "@/lib/models/user.model";


export const newMessage = async ({senderId, receiverId, text, file}:{
    senderId:string, receiverId:string, text:string, file:string
}) => {
    try {
        await ConnectToDB();
        const message = new Message({
            sender:senderId,
            receiver:receiverId,
            text,
            file,
        });
        await message.save();
        return JSON.parse(JSON.stringify({status:200, message: "Message Sent", data:message}));
    } catch (error:any) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
    }
}

export const getMessages = async (loggedInUserId:string, contactId:string) => {
    try {
        await ConnectToDB();
        const messages = await Message.find({
            $or:[
                {sender:loggedInUserId, receiver:contactId},
                {sender:contactId, receiver:loggedInUserId},
            ]
        }).populate("sender receiver");
        return JSON.parse(JSON.stringify({status:200, message: "Messages Found", data:messages}));
    } catch (error:any) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
        
    }
}

